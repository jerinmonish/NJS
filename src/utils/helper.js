import CryptoJS from "crypto-js";
import axios from "axios";
import { useNavigate } from "react-router";

//To encypt single data
export function encryptSingleData(encData) {
  if (encData) {
    var retData = btoa((encData + 122354125410));
    return retData;
    /*var b64 = CryptoJS.AES.encrypt((encData).toString(), 'encSingleData-internalKey').toString();
    var e64 = CryptoJS.enc.Base64.parse(b64);
    var eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;*/
  }
}

//To Decrypt single data
export function decryptSingleData(encData) {
  if (encData) {
    var smp = atob(encData);
    if ((smp)) {
      var retData = atob(encData) - 122354125410;
      return retData
    }
    /*var reb64 = CryptoJS.enc.Hex.parse(encData);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, 'encSingleData-internalKey');
    var plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;*/
  }
}

// sortingLowToHigh (Acending Items)
export function acendingSorter(data, param2) {
  if (data && param2) {
    // const parsePrice = x => parseFloat(x.replace(/^\$/, '')) || 0
    const sortedData = data.slice().sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    return sortedData;
  }
}

// sortingHighToLow (Decending Items)
export function decendingSorter(data, param2) {
  if (data && param2) {
    // const parsePrice = x => parseFloat(x.replace(/^\$/, '')) || 0
    const sortedData = data.slice().sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    return sortedData;
  }
}

export function isLoggedIn() {
  const token = localStorage.getItem('utkn');
  if (token) return true;

  return false;
}

export function decryptUserDataLocalStorage() {
  //const token = localStorage.getItem('user_token');
  // const bytes = (localStorage.getItem('udata')) ? CryptoJS.AES.decrypt(localStorage.getItem('udata'), 'ecom-htl-udata') : '';
  // console.log(localStorage.getItem('udata'));
  if (localStorage.getItem('udata')) {
    const decrypted = CryptoJS.AES.decrypt(localStorage.getItem('udata'), 'ecom-htl-udata').toString(CryptoJS.enc.Utf8);
    return decrypted;
  } else {
    return false;
  }
}


export function decryptUserTknLocalStorage() {
  if (localStorage.getItem('utkn')) {
    try {
      const decrypted = CryptoJS.AES.decrypt(localStorage.getItem('utkn'), 'ecom-htl-udata-tkn').toString(CryptoJS.enc.Utf8);
      if (decrypted?.length > 0) {
        return decrypted.replace(/"/g, "");
      }
    } catch (err) {
      return err
    }
  } else {
    return false;
  }
}


export function setHeadersAPI() {
  var tk = decryptUserTknLocalStorage();
  if (tk?.length > 0) {
    return {
      headers: {
        'Accept': 'application/json',
        "Content-type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${tk.replace(/"/g, "")}`,
      }
    }
  }
}

export const axiosInstance = axios.create({
  // baseURL: HRMS_UTILITY_API_URL,
  headers: setHeadersAPI()?.headers
})
axiosInstance.interceptors.response.use((response) => Promise.resolve(response),
  async (error) => {
    const history = useNavigate();
    if (!error.response) {
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      var result = window.confirm(
        "Session Expired, You will be redirected to Login !"
      );
      if (result) {
        // alert("generate Token");
        history('/login');
      } else {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
);