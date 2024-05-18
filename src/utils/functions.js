// Global fonksiyonlar burada bulunacak

import { PermissionsAndroid, Linking } from 'react-native';



const makePhoneCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`)
  } 


  export {
    makePhoneCall
};