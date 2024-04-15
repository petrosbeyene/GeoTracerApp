// utils/authToken.js
import * as SecureStore from 'expo-secure-store';

export async function saveToken(token: string) {
  try {
    await SecureStore.setItemAsync('userToken', token);
    console.log("Token saved successfully");
  } catch (e) {
    console.error('Error saving the token', e);
  }
}

export async function getToken() {
  try {
    return await SecureStore.getItemAsync('userToken');
  } catch (e) {
    console.error('Error retrieving the token', e);
    return null;
  }
}
