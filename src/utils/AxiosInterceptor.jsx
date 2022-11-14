import React from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import store from '../store';
import { decryptUserTknLocalStorage } from './helper';
export const AxiosInterceptor = axios.create()

AxiosInterceptor.interceptors.request.use(function (config) {
  const token = (store?.getState()?.userApi?.token?.length > 0) ? store?.getState()?.userApi?.token : decryptUserTknLocalStorage()
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

AxiosInterceptor.interceptors.response.use((response) => Promise.resolve(response),
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      // var result = window.confirm(
      //   "Session Expired, Kindly Login !"
      // );
      swal({
        title: "Login Required !",
        text: "Session Expired, Kindly Login !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            window.location.href = "/login"
          } else {
            swal("Kindly Login to access full site !", {
              icon: "error"
            });
          }
        });
      localStorage.removeItem('udata');
      localStorage.removeItem('utkn');
      // if (result) {
      //   console.log("generate Token");
      // } else {
      //   return Promise.reject(error);
      // }
    } else {
      return Promise.reject(error);
    }
  }
);
