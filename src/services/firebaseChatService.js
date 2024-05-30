import {getUser, updateUser} from '../services/userServices';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const firebaseConnection = firestore().collection('ChatRooms');

// İlan ID'si verilen ilan için daha önce bir oda oluşturulup oluşturulmadığını kontrol eden, oda oluşturulmamış ise oda oluşturan fonksiyon
const checkChatRoom = (advertisementID, senderID, advertisementOwnerID) => {
  return new Promise((resolve, reject) => {
    firebaseConnection
      .where('advertisementID', '==', advertisementID)
      .where('participantIDs', 'array-contains', senderID)
      .get()
      .then(async querySnapshot => {
        const rooms = querySnapshot.docs;
        let roomID;
        if (rooms.length === 0) {
          roomID = await createRoom(
            advertisementID,
            senderID,
            advertisementOwnerID,
          );
          resolve(roomID);
        } else {
          roomID = rooms[0].id;
          resolve(roomID);
        }
      })
      .catch(err => {
        console.log('ROOM_CHECK_ERROR', err);
        reject(null);
      });
  });
};

// Yeni sohbet oluşturma
const createRoom = async (advertisementID, userID, ownerID) => {
  return new Promise(async (resolve, reject) => {
    const participantIDs = [userID, ownerID];
    const roomID = uuid.v4();
    try {
      await firebaseConnection.doc(roomID).set({
        advertisementID,
        participantIDs,
        messages: [],
      });
      resolve(roomID);
    } catch (err) {
      console.log('CREATE_ROOM_ERROR', err);
      reject(err);
    }
  });
};

// Mesaj oluşturma
const createMessage = async (roomID, messageDetails) => {
  try {
    await firebaseConnection.doc(roomID).update({
      messages: firestore.FieldValue.arrayUnion(messageDetails),
    });
    console.log('MESSAGE_CREATION_SUCCESS');
  } catch (err) {
    console.log('MESSAGE_CREATION_ERROR', err);
  }
};

export {
  checkChatRoom,
  createMessage,
};
