import React from 'react';
import {View, Text, Image} from 'react-native';

import {Button} from '@components';

import {getStyles} from './Profile.style.js';
import {CONSTANTS} from '@utils';
import THEMECOLORS from '@utils/colors.js';

import {useUser} from '@context/UserProvider.js';
import {useTheme} from '@context/ThemeContext';

const Profile = ({navigation}) => {
  const {user, setUser} = useUser();
  const {theme, setTheme} = useTheme();
  const styles = getStyles(theme);
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;

  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate('ProfileEditScreen')}
        icon={{
          name: 'pencil',
          color: COLORS.textColor,
          size: CONSTANTS.fontSize.L5,
        }}
        label="Profil Düzenle"
        additionalStyles={styles.profileButtonStyle}
      />

      <Button
        onPress={() => navigation.navigate('MessagesScreen')}
        icon={{
          name: 'email-fast',
          color: COLORS.textColor,
          size: CONSTANTS.fontSize.L5,
        }}
        label="Sohbetlerim"
        additionalStyles={styles.profileButtonStyle}
      />
    </View>
  );
};

export default Profile;
