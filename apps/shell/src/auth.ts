let _token: string | null = null;
export const auth = {
  get token() { return _token },
  set token(t: string | null) { _token = t },
  isAuthenticated() { return !!_token },
};