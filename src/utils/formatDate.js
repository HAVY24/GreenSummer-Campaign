/**
 * Format date from ISO string to human-readable format
 * @param {string} dateString - The ISO date string to format
 * @param {string} format - The format to use: 'short', 'long', or 'time'
 * @returns {string} The formatted date string
 */
export const formatDate = (dateString, format = "short") => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const options = {
    short: {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
    long: {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
    time: {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  };

  return date.toLocaleDateString("vi-VN", options[format]);
};

/**
 * Calculate days left from now to a given date
 * @param {string} dateString - The target date as ISO string
 * @returns {number} Days left (negative if date is in the past)
 */
export const getDaysLeft = (dateString) => {
  if (!dateString) return 0;

  const targetDate = new Date(dateString);
  const today = new Date();

  // Clear time part for accurate day calculation
  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const timeDiff = targetDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

/**
 * Format date range from start to end date
 * @param {string} startDateString - Start date as ISO string
 * @param {string} endDateString - End date as ISO string
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDateString, endDateString) => {
  if (!startDateString || !endDateString) return "";

  const startDate = formatDate(startDateString, "short");
  const endDate = formatDate(endDateString, "short");

  return `${startDate} - ${endDate}`;
};

/**
 * Get relative time string (e.g., "2 days ago", "in 3 hours")
 * @param {string} dateString - The date as ISO string
 * @returns {string} Relative time string
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  // Past
  if (diffInSeconds >= 0) {
    if (diffInSeconds < 60) {
      return "vừa xong";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} phút trước`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} giờ trước`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ngày trước`;
    } else {
      return formatDate(dateString, "short");
    }
  }
  // Future
  else {
    const positiveDiff = Math.abs(diffInSeconds);
    if (positiveDiff < 3600) {
      const minutes = Math.ceil(positiveDiff / 60);
      return `trong ${minutes} phút`;
    } else if (positiveDiff < 86400) {
      const hours = Math.ceil(positiveDiff / 3600);
      return `trong ${hours} giờ`;
    } else if (positiveDiff < 2592000) {
      const days = Math.ceil(positiveDiff / 86400);
      return `trong ${days} ngày`;
    } else {
      return formatDate(dateString, "short");
    }
  }
};
