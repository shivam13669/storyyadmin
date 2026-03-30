/**
 * Generate a random 6-digit OTP
 * @returns {string} 6-digit OTP code
 */
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Get OTP expiration time (5 minutes from now)
 * @returns {string} ISO timestamp for expiration
 */
export function getOTPExpirationTime() {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes
  return expiresAt.toISOString();
}

/**
 * Check if OTP has expired
 * @param {string} expiresAt - ISO timestamp of expiration
 * @returns {boolean} True if OTP has expired
 */
export function isOTPExpired(expiresAt) {
  const now = new Date();
  const expiryDate = new Date(expiresAt);
  return now > expiryDate;
}

/**
 * Verify OTP code
 * @param {string} inputOTP - OTP entered by user
 * @param {string} storedOTP - OTP stored in database
 * @param {string} expiresAt - Expiration timestamp
 * @returns {Object} Verification result with status and message
 */
export function verifyOTP(inputOTP, storedOTP, expiresAt) {
  // Check if OTP has expired
  if (isOTPExpired(expiresAt)) {
    return {
      success: false,
      message: 'OTP has expired. Please request a new one.',
      code: 'OTP_EXPIRED',
    };
  }

  // Check if OTP matches
  if (inputOTP.trim() !== storedOTP.trim()) {
    return {
      success: false,
      message: 'Invalid OTP. Please check and try again.',
      code: 'INVALID_OTP',
    };
  }

  return {
    success: true,
    message: 'OTP verified successfully',
    code: 'OTP_VERIFIED',
  };
}
