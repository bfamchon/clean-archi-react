import { AuthGateway, AuthUser } from '../model/auth.gateway';

export class FakeAuthGateway implements AuthGateway {
  constructor(private readonly delay = 0) {}
  onAuthStateChangeListener: (user: AuthUser) => void = () => {
    return;
  };
  authUser!: string;
  willSucceedWithGoogleForUser!: string;
  willSucceedWithGitHubForUser!: string;

  onAuthStateChanged(listener: (user: AuthUser) => void): void {
    this.onAuthStateChangeListener = listener;
  }

  getAuthUser(): string {
    return this.authUser;
  }
  authenticateWithGoogle(): Promise<string> {
    this.authUser = this.willSucceedWithGoogleForUser;
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.willSucceedWithGoogleForUser), this.delay);
    });
  }
  authenticateWithGitHub(): Promise<string> {
    this.authUser = this.willSucceedWithGitHubForUser;
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.willSucceedWithGitHubForUser), this.delay);
    });
  }
  simulateAuthStateChange(authUser: AuthUser) {
    this.onAuthStateChangeListener(authUser);
  }
}

export const authGateway = new FakeAuthGateway();
