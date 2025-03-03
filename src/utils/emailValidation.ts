
/**
 * Email validation utility using the Mails.so API
 */

const API_KEY = '8b89203b-735c-4ab2-be45-3af5ad0a4a0f';
const API_URL = 'https://api.mails.so/v1/validate';

export interface EmailValidationResult {
  deliverable: boolean;
  disposable: boolean;
  is_valid_format: boolean;
  free_provider: boolean;
  role_based: boolean;
  status: string;
  reason?: string;
  domain?: string;
  email?: string;
}

/**
 * Validates an email address using the Mails.so API
 * @param email - Email address to validate
 * @returns A promise with the validation result
 */
export const validateEmail = async (email: string): Promise<EmailValidationResult> => {
  try {
    const response = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'x-mails-api-key': API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Email validation error:', error);
    // Return a default response when the API fails
    return {
      deliverable: true, // Assume valid in case of API failure
      disposable: false,
      is_valid_format: true,
      free_provider: false,
      role_based: false,
      status: 'error',
      reason: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
