let clientInstance = null;
let initializationPromise = null;

class ApperClientSingleton {
  static _client = null;
  static _isInitializing = false;

  static async getInstance() {
    // Return existing client if available
    if (ApperClientSingleton._client) {
      return ApperClientSingleton._client;
    }

    // Wait for ongoing initialization
    if (ApperClientSingleton._isInitializing) {
      return new Promise((resolve) => {
        const checkClient = () => {
          if (ApperClientSingleton._client || !ApperClientSingleton._isInitializing) {
            resolve(ApperClientSingleton._client);
          } else {
            setTimeout(checkClient, 50);
          }
        };
        checkClient();
      });
    }

    // Start initialization
    ApperClientSingleton._isInitializing = true;

    try {
      // Check if SDK is loaded
      if (!window.ApperSDK) {
        console.error('ApperSDK not loaded. Make sure the script is included in index.html');
        return null;
      }

      const { ApperClient } = window.ApperSDK;
      const projectId = import.meta.env.VITE_APPER_PROJECT_ID;
      const publicKey = import.meta.env.VITE_APPER_PUBLIC_KEY;

      if (!projectId) {
        console.error('VITE_APPER_PROJECT_ID is required');
        return null;
      }

      if (!publicKey) {
        console.error('VITE_APPER_PUBLIC_KEY is required');
        return null;
      }

      // Create the ApperClient instance
      ApperClientSingleton._client = new ApperClient({
        apperProjectId: projectId,
        apperPublicKey: publicKey
      });

      console.log('ApperClient initialized successfully');
      return ApperClientSingleton._client;
    } catch (error) {
      console.error('Failed to create ApperClient instance:', error);
      return null;
    } finally {
      ApperClientSingleton._isInitializing = false;
    }
  }

  // Reset method for cleanup
  static reset() {
    ApperClientSingleton._client = null;
    ApperClientSingleton._isInitializing = false;
  }
}

// Export function to get the singleton instance
export const getApperClient = () => {
  return ApperClientSingleton.getInstance();
};

export default getApperClient;