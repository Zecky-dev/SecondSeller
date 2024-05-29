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
          'Talep yapıldı ancak yanıt alınamadı. Lütfen ağ bağlantınızı kontrol edin.',
      };
    } else {
      return {
        status: 'Error',
        message:
          'İstek gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.',
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
          'Talep yapıldı ancak yanıt alınamadı. Lütfen ağ bağlantınızı kontrol edin.',
      };
    } else {
      return {
        status: 'Error',
        message:
          'İstek gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.',
      };
    }
  }
};

const blockUser = async (from, userID) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/user/block?from=${from}&id=${userID}`,
    );
    return {
      status: response.status,
      message: response.data.messsage,
      data: response.data.data,
    };
  } catch (err) {
    return {
      status: 'error',
      message: 'Kullanıcı engellenirken bir hata oluştu.',
      error: err.response.data,
    };
  }
};

// Şifre güncelleme servis fonksiyonu
const changePassword = async (userID, values) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/user/${userID}/changePassword`,
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
          'Talep yapıldı ancak yanıt alınamadı. Lütfen ağ bağlantınızı kontrol edin.',
      };
    } else {
      return {
        status: 'Error',
        message:
          'İstek gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.',
      };
    }
  }
};

export {sendEmailVerification, updateUser, blockUser, changePassword};
