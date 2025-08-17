import React, { useState, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Custom hook for API operations with loading states and error handling
 * @param {Function} apiFunction - The API function to call
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, execute, reset }
 */
export const useApi = (apiFunction, options = {}) => {
  const {
    immediate = false,
    onSuccess = null,
    onError = null,
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Операция выполнена успешно',
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...params) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiFunction(...params);
      const result = response.data;
      
      setData(result);
      
      if (showSuccessToast) {
        toast.success(successMessage);
      }
      
      if (onSuccess) {
        onSuccess(result, response);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Произошла ошибка';
      setError(errorMessage);
      
      if (showErrorToast) {
        toast.error(errorMessage);
      }
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError, showSuccessToast, showErrorToast, successMessage]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // Execute immediately if requested
  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};

/**
 * Hook for API operations that need to be triggered manually
 * @param {Function} apiFunction - The API function to call
 * @param {Object} options - Configuration options
 * @returns {Object} - { loading, error, execute }
 */
export const useApiCall = (apiFunction, options = {}) => {
  const { data, loading, error, execute, reset } = useApi(apiFunction, { 
    immediate: false, 
    ...options 
  });
  
  return { data, loading, error, execute, reset };
};

/**
 * Hook for API operations that should execute immediately
 * @param {Function} apiFunction - The API function to call
 * @param {Array} dependencies - Dependencies array for re-execution
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useApiData = (apiFunction, dependencies = [], options = {}) => {
  const { data, loading, error, execute, reset } = useApi(apiFunction, { 
    immediate: true, 
    showErrorToast: false,
    ...options 
  });

  const refetch = useCallback(() => {
    execute();
  }, [execute]);

  // Re-execute when dependencies change
  React.useEffect(() => {
    if (dependencies.length > 0) {
      execute();
    }
  }, dependencies);

  return { data, loading, error, refetch, reset };
};

/**
 * Hook for form submissions with loading states
 * @param {Function} submitFunction - The function to call on form submit
 * @param {Object} options - Configuration options
 * @returns {Object} - { loading, error, submit }
 */
export const useFormSubmit = (submitFunction, options = {}) => {
  const {
    onSuccess = null,
    onError = null,
    successMessage = 'Данные сохранены успешно',
    resetFormOnSuccess = false,
    resetFormFunction = null,
  } = options;

  const { loading, error, execute } = useApiCall(submitFunction, {
    showSuccessToast: true,
    successMessage,
    onSuccess: (result, response) => {
      if (resetFormOnSuccess && resetFormFunction) {
        resetFormFunction();
      }
      if (onSuccess) {
        onSuccess(result, response);
      }
    },
    onError,
  });

  const submit = useCallback(async (formData, event) => {
    if (event) {
      event.preventDefault();
    }
    return execute(formData);
  }, [execute]);

  return { loading, error, submit };
};

export default useApi;