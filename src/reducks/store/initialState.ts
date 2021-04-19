export interface initialStateInter {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
}

const initialState = {
  products: {},
  users: {
    isSignedIn: false,
    role: "",
    uid: "",
    username: "",
  },
};

export default initialState;
