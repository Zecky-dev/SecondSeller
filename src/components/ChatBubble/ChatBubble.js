import React, {useState} from 'react';
import {View, Text, Image, Pressable, Alert} from 'react-native';

// Tarih formatlamak için
import moment from 'moment';
import 'moment/locale/tr';

import {CONSTANTS} from '@utils';
import MapBubble from './MapBubble/MapBubble';

// styles
import {getStyles} from './ChatBubble.style';

// Kullanıcı mesajın sahibi ise, balon sağda; değilse solda olmalı
const ChatBubble = ({
  user,
  messageDetails,
  theme,
  isMessageOwner,
  removeMessage,
}) => {
  const {createDate, message, isLocation, sender} = messageDetails;

  const styles = getStyles(theme);
  // Mesaj bir konum bilgisi içeriyorsa bu konumu alma
  const [location] = useState(isLocation ? JSON.parse(message) : null);

  // Balonun yönünü belirleme
  const bubbleContainer = isMessageOwner
    ? styles.bubbleContainer_right
    : styles.bubbleContainer_left;

  // Yöne göre balonun stilini belirleme
  const bubble = isMessageOwner ? styles.bubble_right : styles.bubble_left;

  // Tarih formatlama
  const formattedDate = moment(createDate, 'M/D/YYYY, h:mm:ss A')
    .locale('tr')
    .format('DD MMMM YYYY, HH:mm');

  return (
    <Pressable
      style={bubbleContainer}
      onLongPress={() => {
        // Kullanıcı mesajın sahibi ise mesaja basılı tutarak mesajı silebilir
        if (isMessageOwner) {
          Alert.alert(
            'Emin misiniz?',
            'Bu mesajı silmek istediğinize emin misiniz?',
            [
              {
                text: 'Evet',
                onPress: () => removeMessage(messageDetails),
              },
              {
                text: 'Hayır',
                onPress: () => console.log('Messsage deleting cancelled!'),
              },
            ],
          );
        }
      }}>
      <View style={bubble}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: CONSTANTS.margin.L1,
          }}>
          <Image
            source={
              user.imageURL
                ? {uri: user.imageURL}
                : require('@assets/images/avatar.png')
            }
            style={{width: 40, height: 40, borderRadius: 20}}
          />
          <Text style={styles.messageOwner}>{user.nameSurname}</Text>
        </View>
        {/* Eğer mesaj bir konum bilgisi içeriyorsa MapBubble göster, içermiyorsa normal mesaj göster */}
        {isLocation ? (
          <MapBubble
            latitude={location.latitude}
            longitude={location.longitude}
            username={user.nameSurname}
          />
        ) : (
          <Text style={styles.message}>{message}</Text>
        )}
        <Text style={styles.messageDate}>{formattedDate}</Text>
      </View>
    </Pressable>
  );
};

export default ChatBubble;
