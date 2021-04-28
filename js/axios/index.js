import Axios from "./axios";
let axios1 = Axios.create({
  baseUrl: "http://localhost:53613/",
  headers: {
    common: {
      a: "12",
    },
  },
});

//请求拦截器
axios1.interceptors.request.use((config) => {
  console.log("请求配置信息：", config);
  return config;
});

axios1.interceptors.request.use((config) => {
  config.headers.token = "x-token-654321";
  return config;
});

//响应拦截器
axios1.interceptors.response.use((res) => {
  console.log("请求响应信息", res);
  return res;
});

axios1.interceptors.response.use((res) => {
  res.msg = "request is ok ~";
  return res;
});

axios1.get("datas/test.json").then((res) => {
  console.log("返回的数据是:", res);
});

export default Axios;
