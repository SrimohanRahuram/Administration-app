import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'; 

const firestoreShopService={

    saveShopData: async (name, shopID, address,contactNo) => {
        try {
    
          const userDoc = await firestore().collection('Shop').doc(shopID).get();
          
          if (userDoc.exists) {
    
            Alert.alert('Error', 'shopID already exists. Please choose another shopID.');
            return 'shopID already exists';
          }
        
          await firestore()
            .collection('Shop')
            .doc(shopID)
            .set({
              shopID: shopID,
              name: name,
              address: address,
              contactNo:contactNo,
            });
    
          console.log('Shop data added successfully!');
          return 'Success';
        } catch (error) {
          console.error('Error adding Shop data: ', error);
          throw error;
        }
      },

      getAllShops: async () => {
        try {
          const shopCollection = await firestore().collection('Shop').get();
          const shops = shopCollection.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
    
          console.log('Retrieved all Shops data:', shops);
          return shops;
        } catch (error) {
          console.error('Error retrieving Shop data: ', error);
          throw error;
        }
      },  

}

export default firestoreShopService;