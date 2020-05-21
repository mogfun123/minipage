import axios from "axios";
import { Toast } from 'antd-mobile';
import qs from "qs";
// import { router, resetRouter } from "@/router";
let path =''
if(process.env.NODE_ENV =='development'){
   path ='http://47.56.176.252:8890'
}
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.transformRequest = [
  function(data) {
    return qs.stringify(data);
  }
];
const service = axios.create({
  baseURL:'api', // url = base url + request url
  // // withCredentials: true, // send cookies when cross-domain requests
  // cancelToken: source.token,
  // timeout: 5000 // request timeout
});
localStorage.setItem('token','MjhmZTRlOGJlOTY5OTU4ZWM5NTZlM2I3NTM3YTljZGUyMDIwMDUxOA==')
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    config.params.token = localStorage.getItem('token')
      // config.headers["token"] = getToken();
 
     

    return config;
  },
  error => {
    // do something with request error
    //console.log("error", error); // for debug
    return error;
    //return Promise.reject(error)
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 1 && res.code !== 200) {
    //   // Message({
     

    //   return Promise.reject(res);
    // } else {
    //   return res;
    // }
    return response.data
  },
  error => {
    
    return error;
  }
);
export {path} ;
export default service;
