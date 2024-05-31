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
  const senderData = await getUser(senderID, token);
  const receiverData = await getUser(receiverID, token);
  return {
    sender: senderData.data,
    receiver: receiverData.data,
  };
};

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

// Yeni şifreyle güncelleme servis fonksiyonu
const updatePassword = async (emailAddress, newPassword) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/user/updatePassword`,
      { newPassword, emailAddress },
    );
    return {
      status: response.status,
      message: response.data.message,
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

export {
  getSenderReceiverData,
  login,
  getUser,
  blockUser,
  changePassword,
  sendEmailVerification,
  updateUser,
  updatePassword
};
