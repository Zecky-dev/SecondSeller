// Katılımcı olarak bulunulan odaları ve o odanın hangi ilanla ilgili olduğunu içeren bir obje dizisi döndürür
const getMyRooms = async userID => {
  return new Promise((resolve, reject) => {
    firebaseConnection
      .where('participantIDs', 'array-contains', userID)
      .get()
      .then(querySnapshot => {
        const docs = querySnapshot.docs;
        const ids = docs.map(doc => ({
          advertisementID: doc.data().advertisementID,
          roomID: doc.id,
          messageCount: doc.data().messages.length,
          participantIDs: doc.data().participantIDs.filter(id => id !== userID),
        }));
        resolve(ids);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export {getMyRooms};
