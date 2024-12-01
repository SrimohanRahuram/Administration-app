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
      
      

      editShopData: async (id, updatedData) => {
        try {
          const shopDocRef = firestore().collection('Shop').doc(id);
          const shopDoc = await shopDocRef.get();
    
          if (!shopDoc.exists) {
            Alert.alert('Error', 'shop does not exist.');
            return 'shop not found';
          }
    
          await shopDocRef.update(updatedData);
          console.log('shop data updated successfully!');
          return 'Success';
        } catch (error) {
          console.error('Error updating shop data: ', error);
          throw error;
        }
      },
    
      deleteShopData: async (id) => {
        try {
          const shopDocRef = firestore().collection('Shop').doc(id);
          const shopDoc = await shopDocRef.get();
    
          if (!shopDoc.exists) {
            Alert.alert('Error', 'shop does not exist.');
            return 'shop not found';
          }
    
          await shopDocRef.delete();
          console.log('shop data deleted successfully!');
          return 'Success';
        } catch (error) {
          console.error('Error deleting shop data: ', error);
          throw error;
        }
      },

      LoginDataByShop: async (shopID) => {
        try {
          // Access the loginDetails subcollection directly
          const shopSnapshot = await firestore()
            .collection('Shop') // Ensure consistent casing
            .doc(shopID)
            .collection('loginDetails')
            .get();
      
          if (!shopSnapshot.empty) {
            const loginData = shopSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
      
            console.log('Retrieved LoginDataByShop:', loginData);
            return loginData;
          } else {
            console.warn(`No login details found for Shop ID: ${shopID}`);
            return []; // Return an empty array if no data is found
          }
        } catch (error) {
          console.error('Error retrieving LoginDataByShop by ID:', error);
          throw error;
        }
      },

      LoginActiveDataByShop: async (shopID) => {
        try {
          // Access the loginDetails subcollection directly
          const shopSnapshot = await firestore()
            .collection('Shop') // Ensure consistent casing
            .doc(shopID)
            .collection('loginDetails')
            .get();
      
          if (!shopSnapshot.empty) {
            const loginData = shopSnapshot.docs
            .filter(doc => doc.data().status === 'ACTIVE')
            .map((doc) => 
              ({
              id: doc.id,
              ...doc.data(),
            }));
      
            console.log('Retrieved LoginDataByShop:', loginData);
            return loginData;
          } else {
            console.warn(`No login details found for Shop ID: ${shopID}`);
            return []; // Return an empty array if no data is found
          }
        } catch (error) {
          console.error('Error retrieving LoginDataByShop by ID:', error);
          throw error;
        }
      },

}

export default firestoreShopService;