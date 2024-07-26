import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;

axios.defaults.withCredentials = true;

const setAuthorizationHeader = () => {
  const token = localStorage.getItem('userToken');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const handleResponse = (response) => response.data;
const handleError = (error) => {
  console.error(error);
  throw error;
};

async function get(endpoint, params = {}) {
  console.log(`%cGET 요청: ${BASE_URL + endpoint}`, 'color: #a25cd1;');
  setAuthorizationHeader();
  try {
    // const token = localStorage.getItem('userToken');
    // console.log("토큰 읽어"+token);
    const response = await axios.get(endpoint, {
      params,
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

async function post(endpoint, data) {
  console.log(`%cPOST 요청: ${BASE_URL + endpoint}`, 'color: #296aba;');
  console.log(`%cPOST 요청 데이터: ${JSON.stringify(data)}`, 'color: #296aba;');
  setAuthorizationHeader();
  try {
    const response = await axios.post(endpoint, data);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

async function put(endpoint, data) {
  console.log(`%cPUT 요청: ${BASE_URL + endpoint}`, 'color: #059c4b;');
  console.log(`%cPUT 요청 데이터: ${JSON.stringify(data)}`, 'color: #059c4b;');
  setAuthorizationHeader();
  try {
    const response = await axios.put(endpoint, data);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

async function del(endpoint, params = {}) {
  console.log(`DELETE 요청: ${BASE_URL + endpoint}`);
  setAuthorizationHeader();
  try {
    const response = await axios.delete(endpoint, { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export { get, post, put, del as delete };
