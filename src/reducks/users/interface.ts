export interface actionType {
  type: string;
  payload: {
    isSignedIn: boolean;
    uid: string;
    username: string;
  };
}
