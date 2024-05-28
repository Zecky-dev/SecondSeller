import notifee, {AndroidStyle} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

// FCM'e cihaz kaydetme
const createToken = () => {
  try {
    messaging()
      .registerDeviceForRemoteMessages()
      .then(async () => {
        await messaging().getToken();
        console.log('FCM TOKEN CREATED');
      });
  } catch (error) {
    console.log('ERROR', error);
  }
};

// FCM'den cihazı silme
const deleteToken = () => {
  try {
    messaging()
      .unregisterDeviceForRemoteMessages()
      .then(async () => {
        await messaging().deleteToken();
        console.log('FCM TOKEN DELETED');
      });
  } catch (error) {
    console.log('ERROR', error);
  }
};
export {createToken, deleteToken};
