import axios from "axios";
import * as constants from "../actions/types"
import { AxiosInterceptor } from "../utils/AxiosInterceptor";
import { encryptSingleData } from "../utils/helper";

export const topFilterSorter = (sdData) => async (dispatch) => {
  dispatch({
    type: constants.TOP_FILTER,
    payload: sdData
  });
}

export const createCartItem = (sdData) => async (dispatch) => {
  dispatch({
    type: constants.ADD_CART_REQUEST
  });

  try {
    await AxiosInterceptor(`/api/cart/create`, { 'method': 'POST', 'data': sdData })
      .then((res) => {
        dispatch({
          type: constants.ADD_CART_SUCCESS,
          payload: res?.data?.data,
          payloadcnt: res?.data?.cart_cnt,
          payloadmsg: res?.data?.message
        });
      });
  } catch (error) {
    dispatch({
      type: constants.ADD_CART_ERROR
    });
    console.log(error.response);
  }
}

export const createCardPayment = (sdData, history) => async (dispatch) => {
  dispatch({
    type: constants.CARD_PAYMENT_REQUEST
  });

  try {
    await AxiosInterceptor(`/api/create/card/payment`, { 'method': 'POST', 'data': sdData })
      .then((res) => {

        if (res?.data?.message == "payment_success") {
          dispatch({
            type: constants.CARD_PAYMENT_SUCCESS,
            payload: res?.data?.message,
          });
          history(`/payment-success/${(res?.data?.tid)}`)
        } else {
          dispatch({
            type: constants.CARD_PAYMENT_ERROR
          });
        }
      });
  } catch (error) {
    dispatch({
      type: constants.CARD_PAYMENT_ERROR
    });
    console.log(error.response);
  }
}

export const createSingleProductCardPayment = (sdData, history) => async (dispatch) => {
  dispatch({
    type: constants.CARD_PAYMENT_REQUEST
  });

  try {
    await AxiosInterceptor(`/api/create/single-product-card/payment`, { 'method': 'POST', 'data': sdData })
      .then((res) => {

        if (res?.data?.message == "payment_success") {
          dispatch({
            type: constants.CARD_PAYMENT_SUCCESS,
            payload: res?.data?.message,
          });
          history(`/payment-success/${(res?.data?.tid)}`)
        } else {
          dispatch({
            type: constants.CARD_PAYMENT_ERROR
          });
        }
      });
  } catch (error) {
    dispatch({
      type: constants.CARD_PAYMENT_ERROR
    });
    console.log(error.response);
  }
}

export const deleteCartItem = (id, uid) => async (dispatch) => {
  dispatch({
    type: constants.REMOVE_CART_REQUEST
  });

  try {
    await AxiosInterceptor(`/api/cart/delete/${id}?uid=${uid}`, { 'method': 'DELETE' })
      .then((res) => {
        dispatch({
          type: constants.REMOVE_CART_SUCCESS,
          payload: res?.data?.data,
          payloadcnt: res?.data?.cart_cnt,
          payloadmsg: res?.data?.message
        });
      });
  } catch (error) {
    dispatch({
      type: constants.REMOVE_CART_ERROR
    });
    console.log(error.response);
  }
}

export const currentCartItem = (sdData) => async (dispatch) => {
  dispatch({
    type: constants.CART_ITEM_REQUEST
  });

  try {
    await AxiosInterceptor(`/api/cart/my-cart/${sdData}`, { 'method': 'GET' })
      .then((res) => {
        dispatch({
          type: constants.CART_ITEM_SUCCESS,
          payload: res?.data?.data,
          payloadcnt: res?.data?.cart_cnt
        });
      });
  } catch (error) {
    dispatch({
      type: constants.CART_ITEM_ERROR
    });
    console.log(error.response);
  }
}

export const getPurchasedItemBId = (id) => async (dispatch) => {
  dispatch({
    type: constants.GET_PURCHASED_REQUEST
  });

  try {
    await AxiosInterceptor(`/api/cart/purchased/${id}`, { 'method': 'GET' })
      .then((res) => {
        dispatch({
          type: constants.GET_PURCHASED_SUCCESS,
          payload: res?.data?.data,
        });
      });
  } catch (error) {
    dispatch({
      type: constants.GET_PURCHASED_ERROR
    });
    console.log(error.response);
  }
}