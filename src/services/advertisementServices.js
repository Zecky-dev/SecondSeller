import axios from 'axios';
import {BASE_URL} from '@env';

import {deleteRoom} from './firebaseChatService';

// ID'si bilinen ilanın detaylarını getirmek için kullanılan servis fonksiyonu
const getAdvertisementAPI = async (id, token) => {
  if (token) {
    try {
      const advertisement = await axios.get(
        `${BASE_URL}/advertisements/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      return advertisement.data;
    } catch (err) {
      return null;
    }
  }
};

// Öncelikle ilanla ilgili olan mesajlaşmaları siler
// Ardıdan ilanın kendisini siler
const removeAdvertisement = async (id, token) => {
  await deleteRoom(id);
  if (token) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/advertisements/remove?id=${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      return {
        status: response.status,
        message: response.message,
        data: response.data,
      };
    } catch (err) {
      console.log('ADVERTISEMENT_REMOVE_ERROR', err.response.data);
      return null;
    }
  }
};

export {getAdvertisementAPI, removeAdvertisement};
