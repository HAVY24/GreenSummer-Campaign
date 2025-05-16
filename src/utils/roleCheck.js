/**
 * Check if user has required role(s)
 * @param {string} userRole - The user's role
 * @param {string|Array} requiredRoles - Required role(s) to access a feature
 * @returns {boolean} Whether the user has the required role
 */
export const hasRequiredRole = (userRole, requiredRoles) => {
  // If not authenticated
  if (!userRole) return false;

  // Convert to array if a single role was passed
  const rolesArray = Array.isArray(requiredRoles)
    ? requiredRoles
    : [requiredRoles];

  // Check if user role is in the required roles
  return rolesArray.includes(userRole);
};

/**
 * Check if user can edit a campaign/activity/task
 * @param {string} userRole - The user's role
 * @param {string} userId - The user's ID
 * @param {object} item - The item to check (campaign, activity, task)
 * @param {string} type - The type of item: 'campaign', 'activity', or 'task'
 * @returns {boolean} Whether the user can edit the item
 */
export const canEdit = (userRole, userId, item, type) => {
  // Admin can edit anything
  if (userRole === "admin") return true;

  // Leaders can edit certain items
  if (userRole === "leader") {
    // Leaders can edit activities they organize
    if (type === "activity" && item.organizer?._id === userId) return true;

    // Leaders can edit tasks they assigned
    if (type === "task" && item.assignedBy?._id === userId) return true;

    // For campaigns, only admin can edit
    if (type === "campaign") return false;
  }

  // Volunteers can only edit their assigned tasks
  if (userRole === "volunteer") {
    return type === "task" && item.assignedTo?._id === userId;
  }

  return false;
};

/**
 * Get role name in Vietnamese
 * @param {string} role - The role in English
 * @returns {string} Vietnamese role name
 */
export const getRoleName = (role) => {
  const roleMap = {
    admin: "Quản trị viên",
    leader: "Trưởng nhóm",
    volunteer: "Tình nguyện viên",
    member: "Thành viên",
  };

  return roleMap[role] || role;
};

/**
 * Check if user is authorized based on route rules
 * @param {object} user - The current user
 * @param {object} route - The route configuration with auth requirements
 * @returns {boolean} Whether the user is authorized
 */
export const isAuthorized = (user, route) => {
  // Public routes are accessible to everyone
  if (!route.requiresAuth) return true;

  // If route requires auth but user is not logged in
  if (!user) return false;

  // If route has specific role requirements
  if (route.roles && route.roles.length > 0) {
    return hasRequiredRole(user.role, route.roles);
  }

  // If route only requires authentication
  return true;
};
export const roleCheck = {
  hasRequiredRole,
  canEdit,
  getRoleName,
  isAuthorized,
};
