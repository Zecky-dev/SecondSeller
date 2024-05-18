import React from 'react';
import {View, Text, Image} from 'react-native';

import {COLORS, CONSTANTS} from '@utils';
import AppLogo from '@assets/images/app_icon.png';

const Home = () => {
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
        Home
      </Text>
      <Image width={100} height={100} source={AppLogo} />
    </View>
  );
};

export default Home;
