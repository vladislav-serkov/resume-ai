import requests
import sys
from datetime import datetime

class SimpleAPITester:
    def __init__(self, base_url="https://start-stop-button.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {response_data}")
                except:
                    print(f"Response: {response.text[:200]}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:200]}")

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )
        return success

    def test_create_status_check(self):
        """Test creating a status check"""
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        success, response = self.run_test(
            "Create Status Check",
            "POST",
            "api/status",
            200,
            data=test_data
        )
        return response.get('id') if success else None

    def test_get_status_checks(self):
        """Test getting all status checks"""
        success, response = self.run_test(
            "Get Status Checks",
            "GET",
            "api/status",
            200
        )
        return success

    def test_get_ai_status(self):
        """Test getting AI status - should return current status or create default active status"""
        success, response = self.run_test(
            "Get AI Status",
            "GET",
            "api/ai-status",
            200
        )
        if success:
            # Verify response structure
            required_fields = ['id', 'is_active', 'last_updated']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing required field: {field}")
                    return False
            print(f"✅ AI Status structure valid - Active: {response.get('is_active')}")
        return success

    def test_update_ai_status_stop(self):
        """Test updating AI status to stopped"""
        test_data = {
            "is_active": False
        }
        success, response = self.run_test(
            "Update AI Status (Stop)",
            "PUT",
            "api/ai-status",
            200,
            data=test_data
        )
        if success:
            if response.get('is_active') != False:
                print(f"❌ Expected is_active=False, got {response.get('is_active')}")
                return False
            print("✅ AI Status successfully updated to stopped")
        return success

    def test_update_ai_status_start(self):
        """Test updating AI status to active"""
        test_data = {
            "is_active": True
        }
        success, response = self.run_test(
            "Update AI Status (Start)",
            "PUT",
            "api/ai-status",
            200,
            data=test_data
        )
        if success:
            if response.get('is_active') != True:
                print(f"❌ Expected is_active=True, got {response.get('is_active')}")
                return False
            print("✅ AI Status successfully updated to active")
        return success

    def test_ai_status_persistence(self):
        """Test that AI status changes persist in database"""
        print("\n🔍 Testing AI Status Persistence...")
        
        # First, set status to False
        test_data = {"is_active": False}
        success1, response1 = self.run_test(
            "Set AI Status to False",
            "PUT",
            "api/ai-status",
            200,
            data=test_data
        )
        
        if not success1:
            return False
            
        # Then get status to verify it persisted
        success2, response2 = self.run_test(
            "Verify AI Status Persisted (False)",
            "GET",
            "api/ai-status",
            200
        )
        
        if not success2 or response2.get('is_active') != False:
            print(f"❌ Status persistence failed - Expected False, got {response2.get('is_active')}")
            return False
            
        # Now set status to True
        test_data = {"is_active": True}
        success3, response3 = self.run_test(
            "Set AI Status to True",
            "PUT",
            "api/ai-status",
            200,
            data=test_data
        )
        
        if not success3:
            return False
            
        # Finally get status to verify it persisted
        success4, response4 = self.run_test(
            "Verify AI Status Persisted (True)",
            "GET",
            "api/ai-status",
            200
        )
        
        if not success4 or response4.get('is_active') != True:
            print(f"❌ Status persistence failed - Expected True, got {response4.get('is_active')}")
            return False
            
        print("✅ AI Status persistence test passed")
        return True

def main():
    print("🚀 Starting Career Boost Bot Backend API Tests")
    print("=" * 50)
    
    # Setup
    tester = SimpleAPITester()

    # Run tests
    print("\n📋 Testing Backend API Endpoints...")
    
    # Test root endpoint
    if not tester.test_root_endpoint():
        print("❌ Root endpoint failed")
    
    # Test create status check
    status_id = tester.test_create_status_check()
    if not status_id:
        print("❌ Status check creation failed")
    
    # Test get status checks
    if not tester.test_get_status_checks():
        print("❌ Get status checks failed")

    print("\n📋 Testing AI Status Endpoints...")
    
    # Test AI status endpoints
    if not tester.test_get_ai_status():
        print("❌ Get AI status failed")
    
    if not tester.test_update_ai_status_stop():
        print("❌ Update AI status (stop) failed")
    
    if not tester.test_update_ai_status_start():
        print("❌ Update AI status (start) failed")
    
    if not tester.test_ai_status_persistence():
        print("❌ AI status persistence test failed")

    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Backend API Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("✅ All backend API tests passed!")
        return 0
    else:
        print("❌ Some backend API tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())