import axios from 'axios';

import {BASE_URL} from '@env';

// Giriş servis fonksiyonu
const login = async values => {
  try {
    const {emailAddress, password} = values;
    const response = await axios.post(`${BASE_URL}/user/login`, {
      emailAddress,
      password,
    });
    return {
      status: response.status,
      message: response.data.message,
      data: response.data.token,
    };
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    } else if (err.request) {
      return {
        status: 'Network Error',
        message:
          'The request was made but no response was received. Please check your network connection.',
      };
    } else {
      return {
        status: 'Error',
        message:
          'An error occurred while processing your request. Please try again.',
      };
    }
  }
};

// ID'ye göre kullanıcı getirme servis fonksiyonu
const getUser = async (userID, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userID}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return {
      status: 'success',
      message: 'User fetched successfully',
      data: response.data.data,
    };
  } catch (err) {
    return {
      status: 'error',
      message: 'An error occurred while processing your request.',
      error: err.message,
    };
  }
};

const getSenderReceiverData = async (senderID, receiverID, token) => {
  const senderData = await getUser(senderID, token)
  const receiverData = await getUser(receiverID, token)
  return {
    sender: senderData.data,
    receiver: receiverData.data
  }
}

export {
  getSenderReceiverData,
  login,
  getUser,
};
