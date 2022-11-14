import * as constants from "../actions/types";

const initialState = {
  isLoading: false,
  error: "",
  success: "",
  userData: null,
  showToast: false,
  isAuthenticated: false,
  isUserProfileLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.REGISTER_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: "",
      };
    case constants.REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: action.payload,
        success: "success",
      };
    case constants.REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        userData: null,
        error: "error",
      };
    case constants.LOGIN_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: "",
        isAuthenticated: false,
      };
    case constants.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: action.payload,
        success: "success",
        isAuthenticated: true,
      };
    case constants.LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        userData: null,
        error: "error",
        isAuthenticated: false,
      };
    case constants.USER_PROFILE_REQUEST:
      return {
        ...state,
        isUserProfileLoading: true,
        success: "",
      };
    case constants.USER_PROFILE_SUCCESS:
      return {
        ...state,
        isUserProfileLoading: false,
        success: "profile updated",
      };
    case constants.USER_PROFILE_ERROR:
      return {
        ...state,
        isUserProfileLoading: false,
        error: "error",
      };
    default:
      return state;
  }
}