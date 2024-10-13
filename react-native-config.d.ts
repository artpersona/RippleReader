import {EncodingKey} from 'expo-jwt/dist/types/jwt';

declare module 'react-native-config' {
  export interface NativeConfig {
    JWT_API_KEY?: EncodingKey;
  }

  export const Config: NativeConfig;
  export default Config;
}
