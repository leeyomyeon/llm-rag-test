import axios from 'axios';

export default async function callApi({
  url,
  method = 'get',
  params,
  data,
  isLoading = true
}) {
  const response = await axios({
    method: method,
    url: url,
    params,
    data,
    isLoading,
    headers: {
      'Content-Type': 'application/json/charset=UTF-8',
      'Access-Control-Allow_origin': '*'
    }
  });
  const { payload, resultCode, message } = response.data;
  return {
    isSuccess: true,
    data: payload,
    resultCode,
    message,
    response
  };
}