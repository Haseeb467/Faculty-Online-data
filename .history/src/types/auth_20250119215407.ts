import { User } from "firebase/auth";

export type UserRole = 'admin' | 'teacher';

export interface AuthContextType {
  currentUser: User: | null;
  userRole: string | null;
  setUserRole: (role: string) => void;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: UserRole;
}