import axios from 'axios';
import {BASE_URL} from '@env';

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

export {getAdvertisementAPI};
