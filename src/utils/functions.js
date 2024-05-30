import {PermissionsAndroid, Linking} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {showMessage} from 'react-native-flash-message';
import {Buffer} from 'buffer';
import {getUser} from '../services/userServices';
import Storage from './Storage';
import ImageResizer from '@bam.tech/react-native-image-resizer';

const getStatusType = statusCode => {
  if (statusCode >= 100 && statusCode < 200) {
    return 'info';
  } else if (statusCode >= 200 && statusCode < 300) {
    return 'success';
  } else if (statusCode >= 300 && statusCode < 400) {
    return 'warning';
  } else if (statusCode >= 400 && statusCode < 500) {
    return 'danger';
  } else if (statusCode >= 500 && statusCode < 600) {
    return 'default';
  } else {
    return 'none';
  }
};

const showFlashMessage = (statusCode, message) => {
  const messageType = getStatusType(statusCode);
  showMessage({
    type: messageType,
    message,
  });
};

// Token'i decode ederek token'de saklanan kullanıcı
// id'si ile kullanıcı verilerini döndürür.
const getUserFromToken = async () => {
  const token = await Storage.getData('token');
  if (token) {
    const decodedJWT = jwtDecode(token);
    const userID = decodedJWT.userId;
    // getUser token değeri ile kullanıcı verilerini response olarak döner
    const response = await getUser(userID, token);
    return {...response.data, token};
  }
  // Eğer token yok ise null döner
  else {
    return null;
  }
};

export {
  showFlashMessage,
  getUserFromToken,
};
