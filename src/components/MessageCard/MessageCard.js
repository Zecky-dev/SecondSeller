import React from "react";
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {getStyles} from './MessageCard.style';
import { useTheme } from '@context/ThemeContext';

const MessageCard = ({onPress, message, title}) => { // Mesaj kartı fonksiyonu onPress, message ve title propslarını aldı.
    const {theme} =useTheme();
    const styles= getStyles(theme);

    return (
        <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7} // mesaj kartına dokunulduğunda opaklık verir.
        onPress={onPress}> 
         <Image
          source={
            message.imageURL // message nesnesinde imageURL olup olmadığını kontrol eder.
            ? {uri: message.imageURL} // Eğer imageURL varsa resmi yükler.
            : require('@assets/images/avatar.png') // Eğer yoksa @assets/images dosyasının içindeki varsayılan avatar resmini kullanır.
          }
          style={styles.image}
         />
         <View style={{flex: 1}}>
            <Text style={styles.name}>{message.nameSurname}</Text>
            <Text style={styles.advertisementTitle}>{title}</Text>
         </View>
        </TouchableOpacity>
    );
};

export default MessageCard;