import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';

import vector from '@assets/images/app_icon.png';
import {COLORS, CONSTANTS} from '@utils';

import {AdvertisementCard, ChatBubble} from '@components';
import ThemeContextProvider from '@context/ThemeContext';
import UserContextProvider from '@context/UserProvider';

// Test datas
const advertisement = {
  _id: {
    $oid: '6647636a74ec874ca43d7e02',
  },
  createDate: {
    $date: '2024-05-17T13:59:23.145Z',
  },
  title: 'back to the future and jack&ashi',
  description: 'aciklamaaciklamaaciklama',
  owner: {
    $oid: '6647624f52e4451a45243593',
  },
  price: 9999,
  location: {
    latitude: 37.4220936,
    longitude: -122.083922,
    _id: {
      $oid: '6647636a74ec874ca43d7e03',
    },
  },
  category: 'entertainment',
  soldStatus: false,
  images: [
    'https://i.ibb.co/TL6yP8V/b33aaa7b-cd45-40d5-943d-296270436a8b.jpg',
    'https://i.ibb.co/VHRJxJ0/33045d10-80dd-45f2-8757-4e04b691c922.jpg',
  ],
  __v: 0,
};

const user = {
  _id: {
    $oid: '6647624f52e4451a45243593',
  },
  nameSurname: 'alper avci',
  phoneNumber: '05050791674',
  activeStatus: true,
  password: '$2b$10$nMfTlK/Cv4vhoJwPieLdoOPTZE24W6sB1D9vFl8FRO7JIU1zG/pnG',
  emailAddress: 'avcialper12@gmail.com',
  createDate: {
    $date: '2024-05-17T13:40:26.789Z',
  },
  imageURL: '',
  favorites: [],
  advertisements: ['6647636a74ec874ca43d7e02'],
  messageRooms: [],
  blocked: [],
  __v: 0,
};

const locationMessage = JSON.stringify({
  longitude: 30.526495,
  latitude: 37.8309414,
});

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.LIGHT.white,
      }}>
      <Text
        style={{
          color: COLORS.LIGHT.black,
          fontSize: CONSTANTS.fontSize.L6,
          fontFamily: CONSTANTS.APP_FONT,
        }}>
        {CONSTANTS.APP_NAME}
      </Text>
      <Text
        style={{
          color: COLORS.LIGHT.primary,
          fontSize: CONSTANTS.fontSize.L3,
          textAlign: 'center',
          fontWeight: '500',
          fontStyle: 'italic',
        }}>
        {CONSTANTS.APP_SLOGAN}
      </Text>
      <Image width={100} height={100} source={vector} />
    </View>
  );
};

const AppWithContext = () => {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ThemeContextProvider>
  );
};

export default AppWithContext;
