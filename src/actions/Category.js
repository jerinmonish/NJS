import axios from "axios";
import * as constants from "../actions/types"

export const adminDropDownCategory = () => async (dispatch) => {
  dispatch({
    type: constants.LIST_CATEGORY_REQUEST
  });
  //const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${tmpToken}`
  }

  try {
    await axios.get(`/api/category/dp-categories`, {}, { headers: headers })
      .then((res) => {
        dispatch({
          type: constants.LIST_CATEGORY_SUCCESS,
          payload: res.data
        });
      });
  } catch (error) {
    dispatch({
      type: constants.LIST_CATEGORY_ERROR
    });
    console.log(error.response);
  }
}

export const HomePageListCategory = () => async (dispatch) => {
  dispatch({
    type: constants.LIST_CATEGORY_REQUEST
  });
  //const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${tmpToken}`
  }

  try {
    await axios.get(`/api/category/categories`, {}, { headers: headers })
      .then((res) => {
        dispatch({
          type: constants.LIST_CATEGORY_SUCCESS,
          payload: res.data
        });
      });
  } catch (error) {
    dispatch({
      type: constants.LIST_CATEGORY_ERROR
    });
    console.log(error.response);
  }
}