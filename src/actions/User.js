import axios from "axios";
import * as constants from "../actions/types"
import CryptoJS from "crypto-js";
import { AxiosInterceptor } from "../utils/AxiosInterceptor";

//user registration
export const userRegistration = (cdata, history) => async (dispatch) => {
  dispatch({
    type: constants.REGISTER_USER_REQUEST
  });
  //const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${tmpToken}`
  }

  try {
    await axios.post(`/api/user/create`, cdata, { headers: headers })
      .then((res) => {
        dispatch({
          type: constants.REGISTER_USER_SUCCESS,
          // payload: res.data.message
        });
        console.log(res);
        // if (res) {
        //   history('/admin/products');
        // }
      });
  } catch (error) {
    dispatch({
      type: constants.REGISTER_USER_ERROR
    });
    console.log(error.response);
  }
}

export const userLogin = (cdata, history) => async (dispatch) => {
  dispatch({
    type: constants.LOGIN_USER_REQUEST
  });
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    await axios.post(`/api/user/login`, cdata, { headers: headers })
      .then((res) => {
        const userData = CryptoJS.AES.encrypt(JSON.stringify(res?.data), 'ecom-htl-udata').toString();
        const usertkn = CryptoJS.AES.encrypt(JSON.stringify(res?.data?.token), 'ecom-htl-udata-tkn').toString();
        localStorage.setItem('udata', userData);
        localStorage.setItem('utkn', usertkn);
        dispatch({
          type: constants.LOGIN_USER_SUCCESS,
          payload: res?.data?.data,
        });
        // if (res) {
        //   history('/admin/products');
        // }
      });
  } catch (error) {
    dispatch({
      type: constants.LOGIN_USER_ERROR
    });
    console.log(error.response);
  }
}

export const userProfileUpdate = (data, uid) => async (dispatch) => {
  dispatch({
    type: constants.USER_PROFILE_REQUEST
  });

  try {
    await AxiosInterceptor(`/api/user/update-profile/${uid}`, { 'method': 'PUT', 'data': data })
      .then((res) => {
        dispatch({
          type: constants.USER_PROFILE_SUCCESS,
        });
        console.log(res);
      });
  } catch (error) {
    dispatch({
      type: constants.USER_PROFILE_ERROR
    });
    console.log(error.response);
  }
}

export const userLogout = (history) => async (dispatch) => {
  dispatch({
    type: constants.LOGOUT_USER_REQUEST
  });

  try {
    dispatch({
      type: constants.LOGOUT_USER_SUCCESS
    });
    localStorage.removeItem('udata');
    localStorage.removeItem('utkn');
    // history('/login')
    window.location.href = "/"
  } catch (err) {
    dispatch({
      type: constants.LOGOUT_USER_ERROR
    });
  }
}