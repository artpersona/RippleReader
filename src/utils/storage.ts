import EncryptedStorage from 'react-native-encrypted-storage';

export const storeUserSession = async (
  jwt: string | null,
  email: string,
  password?: string,
) => {
  try {
    await EncryptedStorage.setItem(
      'tubig_meter_session',
      JSON.stringify({
        token: jwt,
        username: email,
        password,
      }),
    );
  } catch (error) {
    console.error(error, 'Store User Session Error');
  }
};

export const retrieveUserSession = async () => {
  try {
    const session = await EncryptedStorage.getItem('tubig_meter_session');
    if (session !== undefined) {
      return session;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error, 'Retrieve User Session Error');
  }
};
