import axios from 'axios';

export default function callApi({
  url,
  method = 'POST',
  params,
  data,
  isLoading = true
}) {
  let baseUrl = 'http://127.0.0.1:5000'  // backend-server api
  return axios({
    method: method,
    url: `${baseUrl}${url}`,
    params,
    data,
    isLoading,
    headers: {
      'Content-Type': 'application/json/charset=UTF-8',
      'Access-Control-Allow_origin': '*'
    }
  }).then((response) => {
    const { payload, resultCode, message } = response.data;
    return {
      isSuccess: true,
      data: payload,
      resultCode,
      message,
      response
    };
  }).catch((error) => {
    return {
      isSuccess: false,
      error: error.message,
      response: error.response
    };
  });
}