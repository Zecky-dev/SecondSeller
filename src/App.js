import React from 'react';
import {View, Text, Image} from 'react-native';

import vector from '@assets/images/app_icon.png';
import {COLORS, CONSTANTS} from '@utils';

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

export default App;
