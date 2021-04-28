// function Axios(instanceConfig) {
//   this.defaults = instanceConfig;
//   // this.interceptors = {
//   //   request: new InterceptorManager(),
//   //   response: new InterceptorManager()
//   // };
// }
import defaults from "./defaults.js";
import mergeConfig from "./mergeConfig";
import request from "./request";
import Interceptor from "./Interceptor";
class Axios {
  constructor() {
    this.interceptors = {
      request: new Interceptor(),
      response: new Interceptor(),
    };
  }
  request(config) {
    let configOptions = mergeConfig(this.defaultConfig, config);
    let promise = Promise.resolve(configOptions);
    //请求拦截器
    let requestHandlers = this.interceptors.request.handlers;
    requestHandlers.forEach((handeler) => {
      promise = promise.then(handeler.fulfilled, handeler.rejected);
    });
    //数据请求

    promise = promise.then(request);
    //响应拦截器
    let responseHandlers = this.interceptors.response.handlers;
    responseHandlers.forEach((handler) => {
      promise = promise.then(handler.fulfilled, handler.rejected);
    });
    return promise;
  }
  get(...args) {
    let options;
    if (args.length === 1 && typeof args[0] === "string") {
      //axois.get(url)
      options = {
        method: "get",
        url: args[0],
      };
    } else if (args.length === 1 && args[0] instanceof Object) {
      //axios.get({url,params:{},headers:{}})
      options = {
        ...args[0],
        method: "get",
      };
    } else if (args.length === 2 && typeof args[0] === "string") {
      //axios.get(url,{params:{},headers:{}})
      options = {
        method: "get",
        url: args[0],
        ...args[1],
      };
    } else {
      assert(false, `arguments invalidate!`);
    }
    console.log("get options:", mergeConfig(this.defaultConfig, options));
    let configOptions = mergeConfig(this.defaultConfig, options);
    configOptions.url = configOptions.baseUrl + configOptions.url;
    return this.request(configOptions);
  }
}

Axios.create = Axios.prototype.create = function (config) {
  let configOptions = mergeConfig(defaults, config);
  console.log(configOptions, "configOptions");

  let axios = new Axios(configOptions);
  axios.defaultConfig = configOptions;
  return axios;
};
// Axios.prototype.request = function request(config) {
//   //遵守 axios('example/url'[, config])规则
//   if (typeof config === "string") {
//     config = arguments[1] || {};
//     config.url = arguments[0];
//   } else {
//     config = config || {};
//   }

//   // Set config.method
//   if (config.method) {
//     config.method = config.method.toLowerCase();
//   } else if (this.defaults.method) {
//     config.method = this.defaults.method.toLowerCase();
//   } else {
//     config.method = "get";
//   }
// };
export default Axios.create();
