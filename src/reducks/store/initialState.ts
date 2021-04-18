export interface initialStateInter {
  isSignedIn: boolean;
  uid: string;
  username: string;
}

const initialState = {
  products: {},
  users: {
    isSignedIn: false,
    uid: "",
    username: "",
  },
};

export default initialState;
