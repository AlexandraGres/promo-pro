export const getErrorMessage = (errorCode: string): string => {
  const errorMessages: { [key: string]: string } = {
    // User-related errors
    'auth/user-not-found': 'No account found with this email. Please sign up.',
    'auth/wrong-password': 'The password you entered is incorrect.',
    'auth/email-already-in-use':
      'This email is already associated with an account.',
    'auth/invalid-email': 'The email address is not valid.',
    'auth/user-disabled':
      'This account has been disabled. Please contact support.',

    // Credential-related errors
    'auth/weak-password': 'Your password must be at least 6 characters long.',
    'auth/invalid-password': 'The password provided is invalid.',
    'auth/invalid-credential':
      'The credential used is invalid or expired. Please try again.',
    'auth/missing-email': 'Please enter an email address to proceed.',
    'auth/invalid-verification-code':
      'The verification code is incorrect or expired.',
    'auth/invalid-verification-id':
      'The verification ID is invalid or expired.',

    // Provider and multi-factor errors
    'auth/account-exists-with-different-credential':
      'An account with this email already exists using a different sign-in method.',
    'auth/credential-already-in-use':
      'This credential is already associated with another account.',
    'auth/requires-recent-login':
      'This action requires a recent login. Please log in again.',
    'auth/multi-factor-auth-required':
      'Multi-factor authentication is required. Please follow the steps to complete verification.',

    // Network and configuration errors
    'auth/network-request-failed':
      'Network error. Please check your connection and try again.',
    'auth/too-many-requests':
      'You have made too many requests. Please try again later.',
    'auth/operation-not-allowed':
      'This operation is not allowed. Please contact support.',

    // Token errors
    'auth/id-token-expired': 'Your session has expired. Please log in again.',
    'auth/id-token-revoked':
      'Your session has been revoked. Please log in again.',
    'auth/session-cookie-expired':
      'Your session has expired. Please log in again.',

    // Custom errors
    'auth/unverified-email':
      'Your email is not verified. Please verify your email and try again.',
    'auth/internal-error': 'An unexpected error occurred. Please try again.',

    // Default fallback
    default: 'An unexpected error occurred. Please try again.',
  };

  return errorMessages[errorCode] || errorMessages.default;
};
