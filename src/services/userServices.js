import axios from 'axios';

import {BASE_URL} from '@env';

// E-mail doğrulaması atan servis fonksiyonu
const sendEmailVerification = async (values, type) => {
  const {emailAddress, phoneNumber} = values;
  try {
    const response = await axios.post(
      `${BASE_URL}/user/sendEmailVerification`,
      {emailAddress, phoneNumber, type},
    );
    return {
      status: response.status,
      message: response.data.message,
      data: response.data.data,
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

// Kullanıcı güncelleme servis fonksiyonu
const updateUser = async (userID, values) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/user/${userID}/updateUser`,
      values,
    );
    return {
      status: response.status,
      message: response.data.message,
      data: response.data.data,
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

export {sendEmailVerification, updateUser};
