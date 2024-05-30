export const UserRole = {
  ADMIN: "admin",
  USER: "user"
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export type UserDomain = {
  name: string;
  uid: string;
  email: string;
  role: UserRole;
};
