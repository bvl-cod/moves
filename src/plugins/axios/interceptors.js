function setparams(config) {
  // console.log(config);
  const params = config.params || {};
  config.params = Object.assign(params, {
    apikey: process.env.VUE_APP_API_KEY,
    plot: "full",
  });
  return config;
}

function reternData(res) {
  // console.log(res);
  return res.data;
}

export default function (axios) {
  axios.interceptors.request.use(setparams, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  axios.interceptors.response.use(reternData, function (error) {
    return Promise.reject(error);
  });
}
