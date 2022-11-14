import * as constants from "../actions/types";

const initialState = {
  topFilter: '',
  isLoading: false,
  isCartItemLoading: false,
  currentCItem: [],
  bookedItems: [],
  currentCItemCnt: 0,
  success: '',
  error: '',
};

export default function (state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case constants.TOP_FILTER:
      return {
        ...state,
        topFilter: action.payload,
      };
    case constants.CART_ITEM_REQUEST:
      return {
        ...state,
        isCartItemLoading: true,
        currentCItem: [],
        currentCItemCnt: 0,
        success: '',
      };
    case constants.CART_ITEM_SUCCESS:
      return {
        ...state,
        isCartItemLoading: false,
        currentCItem: action.payload,
        currentCItemCnt: action.payloadcnt,
        success: '',
      };
    case constants.CART_ITEM_ERROR:
      return {
        ...state,
        isCartItemLoading: false,
        currentCItem: [],
        currentCItemCnt: 0,
        success: '',
      };
    case constants.ADD_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
        currentCItem: [],
        currentCItemCnt: 0,
        success: ''
      };
    case constants.ADD_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentCItem: action.payload,
        currentCItemCnt: action.payloadcnt,
        success: action.payloadmsg,
      };
    case constants.ADD_CART_ERROR:
      return {
        ...state,
        isLoading: false,
        currentCItem: [],
        currentCItemCnt: 0,
        success: ''
      };
    case constants.REMOVE_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
        currentCItem: [],
        currentCItemCnt: 0,
        success: ''
      };
    case constants.REMOVE_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentCItem: action.payload,
        currentCItemCnt: action.payloadcnt,
        success: action.payloadmsg,
      };
    case constants.REMOVE_CART_ERROR:
      return {
        ...state,
        isLoading: false,
        currentCItem: [],
        currentCItemCnt: 0,
        success: ''
      };
    case constants.CARD_PAYMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case constants.CARD_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payloadmsg,
      };
    case constants.CARD_PAYMENT_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case constants.GET_PURCHASED_REQUEST:
      return {
        ...state,
        isLoading: true,
        bookedItems: [],
      };
    case constants.GET_PURCHASED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookedItems: action.payload,
      };
    case constants.GET_PURCHASED_ERROR:
      return {
        ...state,
        isLoading: false,
        bookedItems: [],
      };
    default:
      return state;
  }
}
