export type AuthUser = string;

export interface AuthGateway {
  getAuthUser(): string;
  authenticateWithGoogle(): Promise<AuthUser>;
  authenticateWithGitHub(): Promise<AuthUser>;
  onAuthStateChanged(listener: (user: AuthUser) => void): void;
}
