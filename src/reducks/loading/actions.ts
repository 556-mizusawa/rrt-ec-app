import { loadingActionType } from "./type";

export const HIDE_LOADING = "HIDE_LOADING";
export const hideLoadingAction = (): loadingActionType => {
  return {
    type: "HIDE_LOADING",
    payload: {
      state: false,
      text: "",
    },
  };
};

export const SHOW_LOADING = "SHOW_LOADING";
export const showLoadingAction = (text = "loading..."): loadingActionType => {
  return {
    type: "SHOW_LOADING",
    payload: {
      state: true,
      text: text,
    },
  };
};
