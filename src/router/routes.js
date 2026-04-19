export const APP_ROLES = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  DOCTOR: "doctor",
  VIEWER: "viewer",
};

export const allowedClinical = [APP_ROLES.DOCTOR, APP_ROLES.VIEWER];
export const allowedAdminAndAbove = [APP_ROLES.ADMIN, APP_ROLES.SUPERADMIN];
export const allowedAdminOnly = [APP_ROLES.ADMIN];

export function getDefaultRouteForRole(role) {
  if (role === APP_ROLES.SUPERADMIN) return "/superadmin";
  if (role === APP_ROLES.ADMIN) return "/admin";
  return "/triage";
}
