import * as constants from "../actions/types";

const initialState = {
  isLoading: false,
  error: "",
  success: "",
  categoryData: null,
  showToast: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.LIST_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: "",
      };
    case constants.LIST_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryData: action.payload,
        success: "success",
      };
    case constants.LIST_CATEGORY_ERROR:
      return {
        ...state,
        isLoading: false,
        categoryData: null,
        error: "error",
      };
    default:
      return state;
  }
}