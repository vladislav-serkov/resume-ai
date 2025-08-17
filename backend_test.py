import requests
import sys
import json
from datetime import datetime

class SmartCareerAPITester:
    def __init__(self, base_url="https://youthful-franklin.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.auth_token = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        default_headers = {'Content-Type': 'application/json'}
        
        if headers:
            default_headers.update(headers)
        
        if self.auth_token:
            default_headers['Authorization'] = f'Bearer {self.auth_token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=default_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=default_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=default_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=default_headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2, ensure_ascii=False)[:300]}...")
                    return True, response_data
                except:
                    print(f"Response: {response.text[:200]}")
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:300]}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    # Health Check Tests
    def test_health_endpoint(self):
        """Test health check endpoint"""
        success, response = self.run_test(
            "Health Check Endpoint",
            "GET",
            "health",
            200
        )
        return success

    def test_api_root(self):
        """Test API root endpoint"""
        success, response = self.run_test(
            "API Root Endpoint",
            "GET",
            "api",
            200
        )
        return success

    # Authentication Tests
    def test_auth_register(self):
        """Test user registration"""
        test_data = {
            "email": f"testuser_{datetime.now().strftime('%H%M%S')}@example.com",
            "password": "TestPassword123!",
            "firstName": "Иван",
            "lastName": "Петров",
            "phone": "+7 (999) 123-45-67"
        }
        success, response = self.run_test(
            "User Registration",
            "POST",
            "api/auth/register",
            201,
            data=test_data
        )
        return success, response

    def test_auth_login(self):
        """Test user login"""
        test_data = {
            "email": "ivan.petrov@example.com",
            "password": "password123"
        }
        success, response = self.run_test(
            "User Login",
            "POST",
            "api/auth/login",
            200,
            data=test_data
        )
        if success and 'token' in response.get('data', {}):
            self.auth_token = response['data']['token']
        return success, response

    # Profile Tests
    def test_profile_get(self):
        """Test get user profile"""
        success, response = self.run_test(
            "Get User Profile",
            "GET",
            "api/profile",
            200
        )
        return success

    def test_profile_update(self):
        """Test update user profile"""
        test_data = {
            "firstName": "Иван",
            "lastName": "Петров",
            "email": "ivan.petrov.updated@example.com",
            "phone": "+7 (999) 888-77-66",
            "location": "Москва, Россия",
            "bio": "Опытный Frontend разработчик с 5+ годами опыта"
        }
        success, response = self.run_test(
            "Update User Profile",
            "PUT",
            "api/profile",
            200,
            data=test_data
        )
        return success

    # Resume Tests
    def test_resumes_get(self):
        """Test get all resumes"""
        success, response = self.run_test(
            "Get All Resumes",
            "GET",
            "api/resumes",
            200
        )
        return success, response

    def test_resumes_create(self):
        """Test create new resume"""
        test_data = {
            "title": "Frontend Developer Resume",
            "personalInfo": {
                "firstName": "Иван",
                "lastName": "Петров",
                "email": "ivan.petrov@example.com",
                "phone": "+7 (999) 123-45-67",
                "location": "Москва, Россия"
            },
            "summary": "Опытный Frontend разработчик с экспертизой в React, TypeScript и современных веб-технологиях",
            "skills": ["React", "TypeScript", "JavaScript", "HTML/CSS", "Node.js"],
            "experience": [
                {
                    "company": "ТехКомпания",
                    "position": "Senior Frontend Developer",
                    "startDate": "2020-01-01",
                    "endDate": "2024-01-01",
                    "description": "Разработка современных веб-приложений"
                }
            ]
        }
        success, response = self.run_test(
            "Create New Resume",
            "POST",
            "api/resumes",
            201,
            data=test_data
        )
        return success, response

    def test_resumes_update(self):
        """Test update resume"""
        test_data = {
            "title": "Updated Frontend Developer Resume",
            "summary": "Обновленное описание профессиональных навыков"
        }
        success, response = self.run_test(
            "Update Resume",
            "PUT",
            "api/resumes/1",
            200,
            data=test_data
        )
        return success

    def test_resumes_delete(self):
        """Test delete resume"""
        success, response = self.run_test(
            "Delete Resume",
            "DELETE",
            "api/resumes/1",
            200
        )
        return success

    # Vacancy Tests
    def test_vacancies_get(self):
        """Test get all vacancies"""
        success, response = self.run_test(
            "Get All Vacancies",
            "GET",
            "api/vacancies",
            200
        )
        return success

    def test_vacancies_get_with_filters(self):
        """Test get vacancies with filters"""
        success, response = self.run_test(
            "Get Vacancies with Filters",
            "GET",
            "api/vacancies?position=Frontend&location=Москва&salary_min=100000",
            200
        )
        return success

    def test_vacancy_get_by_id(self):
        """Test get specific vacancy"""
        success, response = self.run_test(
            "Get Vacancy by ID",
            "GET",
            "api/vacancies/1",
            200
        )
        return success

    # Application Tests
    def test_applications_get(self):
        """Test get all applications"""
        success, response = self.run_test(
            "Get All Applications",
            "GET",
            "api/applications",
            200
        )
        return success

    def test_applications_create(self):
        """Test create new application"""
        test_data = {
            "vacancyId": "1",
            "resumeId": "1",
            "coverLetter": "Здравствуйте! Меня заинтересовала ваша вакансия Frontend разработчика. У меня есть необходимый опыт и навыки для этой позиции."
        }
        success, response = self.run_test(
            "Create New Application",
            "POST",
            "api/applications",
            201,
            data=test_data
        )
        return success

    def test_application_get_by_id(self):
        """Test get specific application"""
        success, response = self.run_test(
            "Get Application by ID",
            "GET",
            "api/applications/1",
            200
        )
        return success

    # Notification Tests
    def test_notifications_get(self):
        """Test get all notifications"""
        success, response = self.run_test(
            "Get All Notifications",
            "GET",
            "api/notifications",
            200
        )
        return success

    def test_notification_mark_read(self):
        """Test mark notification as read"""
        success, response = self.run_test(
            "Mark Notification as Read",
            "PUT",
            "api/notifications/1/read",
            200
        )
        return success

    def test_notifications_mark_all_read(self):
        """Test mark all notifications as read"""
        success, response = self.run_test(
            "Mark All Notifications as Read",
            "PUT",
            "api/notifications/read-all",
            200
        )
        return success

    def test_notification_delete(self):
        """Test delete notification"""
        success, response = self.run_test(
            "Delete Notification",
            "DELETE",
            "api/notifications/1",
            200
        )
        return success

    # Statistics Tests
    def test_stats_get(self):
        """Test get user statistics"""
        success, response = self.run_test(
            "Get User Statistics",
            "GET",
            "api/stats",
            200
        )
        return success

def main():
    print("🚀 Starting SmartCareer Node.js Backend API Tests")
    print("=" * 60)
    
    # Setup
    tester = SmartCareerAPITester()
    failed_tests = []

    # Run tests in logical order
    print("\n📋 Testing SmartCareer Backend API Endpoints...")
    
    # Health checks
    print("\n🏥 HEALTH CHECK TESTS")
    if not tester.test_health_endpoint():
        failed_tests.append("Health Check")
    if not tester.test_api_root():
        failed_tests.append("API Root")

    # Authentication tests
    print("\n🔐 AUTHENTICATION TESTS")
    reg_success, reg_response = tester.test_auth_register()
    if not reg_success:
        failed_tests.append("User Registration")
    
    login_success, login_response = tester.test_auth_login()
    if not login_success:
        failed_tests.append("User Login")

    # Profile tests
    print("\n👤 PROFILE TESTS")
    if not tester.test_profile_get():
        failed_tests.append("Get Profile")
    if not tester.test_profile_update():
        failed_tests.append("Update Profile")

    # Resume tests
    print("\n📄 RESUME TESTS")
    resumes_success, resumes_response = tester.test_resumes_get()
    if not resumes_success:
        failed_tests.append("Get Resumes")
    
    create_resume_success, create_resume_response = tester.test_resumes_create()
    if not create_resume_success:
        failed_tests.append("Create Resume")
    
    if not tester.test_resumes_update():
        failed_tests.append("Update Resume")
    if not tester.test_resumes_delete():
        failed_tests.append("Delete Resume")

    # Vacancy tests
    print("\n💼 VACANCY TESTS")
    if not tester.test_vacancies_get():
        failed_tests.append("Get Vacancies")
    if not tester.test_vacancies_get_with_filters():
        failed_tests.append("Get Vacancies with Filters")
    if not tester.test_vacancy_get_by_id():
        failed_tests.append("Get Vacancy by ID")

    # Application tests
    print("\n📝 APPLICATION TESTS")
    if not tester.test_applications_get():
        failed_tests.append("Get Applications")
    if not tester.test_applications_create():
        failed_tests.append("Create Application")
    if not tester.test_application_get_by_id():
        failed_tests.append("Get Application by ID")

    # Notification tests
    print("\n🔔 NOTIFICATION TESTS")
    if not tester.test_notifications_get():
        failed_tests.append("Get Notifications")
    if not tester.test_notification_mark_read():
        failed_tests.append("Mark Notification Read")
    if not tester.test_notifications_mark_all_read():
        failed_tests.append("Mark All Notifications Read")
    if not tester.test_notification_delete():
        failed_tests.append("Delete Notification")

    # Statistics tests
    print("\n📊 STATISTICS TESTS")
    if not tester.test_stats_get():
        failed_tests.append("Get Statistics")

    # Print results
    print("\n" + "=" * 60)
    print(f"📊 SmartCareer Backend API Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if failed_tests:
        print(f"\n❌ Failed tests ({len(failed_tests)}):")
        for test in failed_tests:
            print(f"  - {test}")
    
    if tester.tests_passed == tester.tests_run:
        print("✅ All SmartCareer backend API tests passed!")
        return 0
    else:
        print("❌ Some SmartCareer backend API tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())