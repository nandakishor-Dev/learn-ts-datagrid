export type Role = "Admin" | "Editor" | "Viewer";

export interface UserValues {
  name: string;
  email: string;
  role: Role;
}