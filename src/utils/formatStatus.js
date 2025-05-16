/**
 * Format campaign, activity or task status to display with proper styling
 * @param {string} status - The status value from the API
 * @param {string} type - The entity type: 'campaign', 'activity', or 'task'
 * @returns {object} Object containing class names and translated status text
 */
export const formatStatus = (status, type = "campaign") => {
  const statusMap = {
    // Campaign statuses
    campaign: {
      planning: {
        text: "Lên kế hoạch",
        className: "bg-blue-100 text-blue-800",
        icon: "clipboard-list",
      },
      ongoing: {
        text: "Đang diễn ra",
        className: "bg-green-100 text-green-800",
        icon: "play",
      },
      completed: {
        text: "Đã hoàn thành",
        className: "bg-gray-100 text-gray-800",
        icon: "check-circle",
      },
    },
    // Activity statuses
    activity: {
      upcoming: {
        text: "Sắp diễn ra",
        className: "bg-yellow-100 text-yellow-800",
        icon: "clock",
      },
      ongoing: {
        text: "Đang diễn ra",
        className: "bg-green-100 text-green-800",
        icon: "play",
      },
      completed: {
        text: "Đã hoàn thành",
        className: "bg-gray-100 text-gray-800",
        icon: "check-circle",
      },
      cancelled: {
        text: "Đã hủy",
        className: "bg-red-100 text-red-800",
        icon: "x-circle",
      },
    },
    // Task statuses
    task: {
      pending: {
        text: "Chờ xử lý",
        className: "bg-yellow-100 text-yellow-800",
        icon: "clock",
      },
      in_progress: {
        text: "Đang thực hiện",
        className: "bg-blue-100 text-blue-800",
        icon: "loader",
      },
      completed: {
        text: "Đã hoàn thành",
        className: "bg-green-100 text-green-800",
        icon: "check-circle",
      },
      cancelled: {
        text: "Đã hủy",
        className: "bg-red-100 text-red-800",
        icon: "x-circle",
      },
    },
    // Member statuses
    member: {
      active: {
        text: "Đang hoạt động",
        className: "bg-green-100 text-green-800",
        icon: "user-check",
      },
      inactive: {
        text: "Không hoạt động",
        className: "bg-gray-100 text-gray-800",
        icon: "user-minus",
      },
      suspended: {
        text: "Tạm ngưng",
        className: "bg-red-100 text-red-800",
        icon: "user-x",
      },
    },
  };

  // If status or type doesn't exist in our map, return default values
  if (!statusMap[type] || !statusMap[type][status]) {
    return {
      text: status || "Không xác định",
      className: "bg-gray-100 text-gray-800",
      icon: "help-circle",
    };
  }

  return statusMap[type][status];
};

/**
 * Format task priority with proper styling
 * @param {string} priority - The priority value from the API
 * @returns {object} Object containing class names and translated priority text
 */
export const formatPriority = (priority) => {
  const priorityMap = {
    low: {
      text: "Thấp",
      className: "bg-blue-100 text-blue-800",
      icon: "arrow-down",
    },
    medium: {
      text: "Trung bình",
      className: "bg-yellow-100 text-yellow-800",
      icon: "minus",
    },
    high: {
      text: "Cao",
      className: "bg-red-100 text-red-800",
      icon: "arrow-up",
    },
  };

  // If priority doesn't exist in our map, return default values
  if (!priorityMap[priority]) {
    return {
      text: priority || "Không xác định",
      className: "bg-gray-100 text-gray-800",
      icon: "help-circle",
    };
  }

  return priorityMap[priority];
};
