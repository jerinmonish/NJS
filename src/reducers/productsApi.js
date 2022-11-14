import * as constants from "../actions/types";

const initialState = {
  isLoading: false,
  error: "",
  success: "",
  productData: null,
  showToast: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.LIST_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
      };
    case constants.LIST_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productListData: action.payload,
        success: "success",
      };
    case constants.LIST_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        productListData: null,
        error: "error",
      };
    case constants.LIST_PRODUCT_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
      };
    case constants.LIST_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productListData: action.payload,
        success: "success",
      };
    case constants.LIST_PRODUCT_CATEGORY_ERROR:
      return {
        ...state,
        isLoading: false,
        productListData: null,
        error: "error",
      };
    case constants.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
      };
    case constants.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productData: action.payload,
        success: "success",
        showToast: true,
      };
    case constants.ADD_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        productData: null,
        error: "error",
      };
    case constants.EDIT_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
      };
    case constants.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productData: action.payload,
        success: "success",
      };
    case constants.EDIT_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        productData: null,
        error: "error",
      };
    case constants.USER_WISHLIST_REQUEST:
      return {
        ...state,
        isWishLoading: true,
        error: "",
        success: "",
      };
    case constants.USER_WISHLIST_SUCCESS:
      return {
        ...state,
        isWishLoading: false,
        success: action.payload,
      };
    case constants.USER_WISHLIST_ERROR:
      return {
        ...state,
        isWishLoading: false,
        error: "wishlist error",
      };

    case constants.MESSAGE_CLEAR:
      return {
        ...state,
        success: '',
        error: '',
        showToast: false,
      }
    case constants.GET_PRODUCT_QTY_MORE_REQ:
      return {
        ...state,
        isLoading: true,
      }
    case constants.GET_PRODUCT_QTY_MORE_SUC:
      return {
        ...state,
        isLoading: false,
        productData: action.payload,
      }
    case constants.GET_PRODUCT_QTY_MORE_EOR:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
}