// API base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// User roles
export const USER_ROLES = {
  ADMIN: "admin",
  LEADER: "leader",
  VOLUNTEER: "volunteer",
};

// Campaign statuses
export const CAMPAIGN_STATUS = {
  PLANNING: "planning",
  ONGOING: "ongoing",
  COMPLETED: "completed",
};

// Activity statuses
export const ACTIVITY_STATUS = {
  UPCOMING: "upcoming",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

// Task statuses
export const TASK_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

// Task priorities
export const TASK_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

// Member statuses
export const MEMBER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
};

// Member roles in campaigns
export const MEMBER_ROLES = {
  LEADER: "leader",
  MEMBER: "member",
};

// Navigation items
export const NAV_ITEMS = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "layout-dashboard",
    requiresAuth: true,
  },
  {
    name: "Chiến dịch",
    path: "/campaigns",
    icon: "flag",
    requiresAuth: false,
  },
  {
    name: "Hoạt động",
    path: "/activities",
    icon: "calendar",
    requiresAuth: true,
  },
  {
    name: "Nhiệm vụ",
    path: "/tasks",
    icon: "check-square",
    requiresAuth: true,
  },
  {
    name: "Thành viên",
    path: "/members",
    icon: "users",
    requiresAuth: true,
    roles: [USER_ROLES.ADMIN, USER_ROLES.LEADER],
  },
  {
    name: "Hồ sơ",
    path: "/profile",
    icon: "user",
    requiresAuth: true,
  },
];

// Form validation errors
export const FORM_ERRORS = {
  REQUIRED: "Thông tin này là bắt buộc",
  EMAIL_INVALID: "Email không hợp lệ",
  PASSWORD_SHORT: "Mật khẩu phải có ít nhất 6 ký tự",
  PASSWORDS_DONT_MATCH: "Mật khẩu nhập lại không khớp",
  DATE_INVALID: "Ngày không hợp lệ",
  END_DATE_BEFORE_START: "Ngày kết thúc phải sau ngày bắt đầu",
  PHONE_INVALID: "Số điện thoại không hợp lệ",
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  OPTIONS: [5, 10, 25, 50],
};
