/**
 * Format currency with proper localization
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date to readable string
 * @param {string} isoDate - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

/**
 * Format time to readable string
 * @param {string} isoDate - ISO date string
 * @returns {string} Formatted time string
 */
export const formatTime = (isoDate) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

/**
 * Format full date and time
 * @param {string} isoDate - ISO date string
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (isoDate) => {
  return `${formatDate(isoDate)} at ${formatTime(isoDate)}`;
};

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param {string} isoDate - ISO date string
 * @returns {string} Relative time string
 */
export const getRelativeTime = (isoDate) => {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return formatDate(isoDate);
};

/**
 * Validate transaction input
 * @param {object} transaction - Transaction object to validate
 * @returns {object} Validation result { isValid, errors }
 */
export const validateTransaction = ({ title, amount }) => {
  const errors = {};

  if (!title || title.trim() === '') {
    errors.title = 'Title is required';
  } else if (title.trim().length < 2) {
    errors.title = 'Title must be at least 2 characters';
  } else if (title.trim().length > 50) {
    errors.title = 'Title must be less than 50 characters';
  }

  const numAmount = parseFloat(amount);
  if (amount === '' || amount === null || amount === undefined) {
    errors.amount = 'Amount is required';
  } else if (isNaN(numAmount)) {
    errors.amount = 'Amount must be a valid number';
  } else if (numAmount === 0) {
    errors.amount = 'Amount cannot be zero';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Generate a random color based on string
 * @param {string} str - Input string
 * @returns {string} HSL color string
 */
export const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};
