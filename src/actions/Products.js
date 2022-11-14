import axios from "axios";
import * as constants from "../actions/types"
// import { setHeadersAPI, axiosInstance } from "../utils/helper";
import { AxiosInterceptor } from "../utils/AxiosInterceptor";

export const adminListAllProducts = (serData) => async (dispatch) => {
  dispatch({
    type: constants.LIST_PRODUCT_REQUEST
  });
  //const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${tmpToken}`
  }
  try {
    // await axios.get(`/api/product/products`, {}, { headers: headers })
    await AxiosInterceptor(`/api/product/products${serData?.selected}`, {
      'method': 'GET',
    }).then((res) => {
      dispatch({
        type: constants.LIST_PRODUCT_SUCCESS,
        payload: res.data
      });
    });
  } catch (error) {
    dispatch({
      type: constants.LIST_PRODUCT_ERROR
    });
    console.log(error.response);
  }
}

export const UserListAllProducts = (serData) => async (dispatch) => {
  dispatch({
    type: constants.LIST_PRODUCT_REQUEST
  });
  //const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${tmpToken}`
  }

  try {
    await AxiosInterceptor(`/api/product/products${serData?.selected}`, {
      'method': 'GET',
    }).then((res) => {
      dispatch({
        type: constants.LIST_PRODUCT_SUCCESS,
        payload: res.data
      });
    })
    /*await axios.get(`/api/product/products${serData?.selected}`, {}, { headers: headers })
      .then((res) => {
        dispatch({
          type: constants.LIST_PRODUCT_SUCCESS,
          payload: res.data
        });
      });*/
  } catch (error) {
    dispatch({
      type: constants.LIST_PRODUCT_ERROR
    });
  }
}

export const UserListAllProductsByCategory = (serData) => async (dispatch) => {
  dispatch({
    type: constants.LIST_PRODUCT_CATEGORY_REQUEST
  });
  try {
    await AxiosInterceptor(`/api/product/category-by-product${serData?.id + serData?.selected}`, {
      'method': 'GET',
    }).then((res) => {
      dispatch({
        type: constants.LIST_PRODUCT_CATEGORY_SUCCESS,
        payload: res.data
      });
    })
  } catch (error) {
    dispatch({
      type: constants.LIST_PRODUCT_CATEGORY_ERROR
    });
  }
}

//Add Products to table
export const adminAddProduct = (cdata, history) => async (dispatch) => {
  dispatch({
    type: constants.ADD_PRODUCT_REQUEST
  });
  //const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${tmpToken}`
  }

  try {
    // await axios.post(`/api/product/create`, cdata, { headers: headers })
    // await AxiosInterceptor(`/api/product/create`, cdata, { headers: headers })
    await AxiosInterceptor(`/api/product/create`, { 'method': 'POST', 'data': cdata })
      .then((res) => {
        dispatch({
          type: constants.ADD_PRODUCT_SUCCESS,
          // payload: res.data.message
        });
        console.log(res);
        if (res) {
          history('/admin/products');
        }
      });
  } catch (error) {
    dispatch({
      type: constants.ADD_PRODUCT_ERROR
    });
    console.log(error.response);
  }
}

//Get product By id
export const adminGetProductById = (id, history) => async (dispatch) => {
  dispatch({
    type: constants.EDIT_PRODUCT_REQUEST
  });
  //const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${tmpToken}`
  }

  try {
    await axios.get(`/api/product/product/${id}`, {}, { headers: headers })
      .then((res) => {
        dispatch({
          type: constants.EDIT_PRODUCT_SUCCESS,
          payload: res.data.data
        });
      });
  } catch (error) {
    dispatch({
      type: constants.EDIT_PRODUCT_ERROR
    });
    console.log(error.response);
  }
}

//Get product By id
export const userGetProductById = (id, uid) => async (dispatch) => {
  dispatch({
    type: constants.EDIT_PRODUCT_REQUEST
  });
  //const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${tmpToken}`
  }

  try {
    await axios.get(`/api/product/products/${id}&${uid}`, {}, { headers: headers })
      .then((res) => {
        dispatch({
          type: constants.EDIT_PRODUCT_SUCCESS,
          payload: res.data
        });
      });
  } catch (error) {
    dispatch({
      type: constants.EDIT_PRODUCT_ERROR
    });
    console.log(error.response);
  }
}

//Update Products to table
export const adminUpdateProduct = (cdata, history, id) => async (dispatch) => {
  dispatch({
    type: constants.UPDATE_PRODUCT_REQUEST
  });
  //const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${tmpToken}`
  }

  try {
    await axios.put(`/api/product/update/${id}`, cdata, { headers: headers })
      .then((res) => {
        dispatch({
          type: constants.UPDATE_PRODUCT_SUCCESS,
          // payload: res.data.message
        });
        console.log(res);
        if (res) {
          history('/admin/products');
        }
      });
  } catch (error) {
    dispatch({
      type: constants.UPDATE_PRODUCT_ERROR
    });
    console.log(error.response);
  }
}


//Get product By id greater than 0 for buy now
export const ProductGreaterThanZero = (id) => async (dispatch) => {
  dispatch({
    type: constants.EDIT_PRODUCT_REQUEST
  });
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    await AxiosInterceptor(`/api/product/buy-now-product-id/${id}`, {
      'method': 'GET',
    }).then((res) => {
      dispatch({
        type: constants.EDIT_PRODUCT_SUCCESS,
        payload: res.data.data
      });
    });
  } catch (error) {
    dispatch({
      type: constants.EDIT_PRODUCT_ERROR
    });
    console.log(error.response);
  }
}

export const userUpdateWishList = (uData) => async (dispatch) => {
  dispatch({
    type: constants.USER_WISHLIST_REQUEST
  });
  //const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${tmpToken}`
  }
  try {
    // await axios.get(`/api/product/products`, {}, { headers: headers })
    await AxiosInterceptor(`/api/user/update-wishlist`, {
      'method': 'PUT',
      'data': uData
    }).then((res) => {

      dispatch({
        type: constants.USER_WISHLIST_SUCCESS,
        payload: res?.data?.message
      });
    });
  } catch (error) {
    dispatch({
      type: constants.USER_WISHLIST_ERROR
    });
    console.log(error.response);
  }
}