import { AuthGateway } from '../model/auth.gateway';
import { FakeAuthGateway } from './fake-auth.gateway';

export class FakeAuthStorageGateway implements AuthGateway {
  constructor(private readonly fakeAuthGateway: FakeAuthGateway) {
    this.checkIfAuthenticated();
  }
  private checkIfAuthenticated() {
    const maybeAuthUser = localStorage.getItem('fake-auth');
    if (maybeAuthUser !== null) {
      this.fakeAuthGateway.simulateAuthStateChange(maybeAuthUser);
    }
  }

  getAuthUser(): string {
    return this.fakeAuthGateway.getAuthUser();
  }
  async authenticateWithGoogle(): Promise<string> {
    const authUser = await this.fakeAuthGateway.authenticateWithGoogle();
    localStorage.setItem('fake-auth', authUser);
    this.fakeAuthGateway.onAuthStateChangeListener(authUser);

    return authUser;
  }
  async authenticateWithGitHub(): Promise<string> {
    const authUser = await this.fakeAuthGateway.authenticateWithGitHub();
    localStorage.setItem('fake-auth', authUser);
    this.fakeAuthGateway.onAuthStateChangeListener(authUser);

    return authUser;
  }
  onAuthStateChanged(listener: (user: string) => void): void {
    this.fakeAuthGateway.onAuthStateChanged(listener);
    this.checkIfAuthenticated();
  }
}
