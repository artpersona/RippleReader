import React, {useEffect} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {View, Alert} from 'react-native';
import {useUserStore} from '../stores';

const NetworkMonitor = () => {
  const {setConnectionStatus} = useUserStore() as any;
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const {isConnected} = state;
      console.log('Connection status:', isConnected);
      const isOffline = !isConnected;
      Alert.alert(
        'Network Status',
        'You are ' + (isOffline ? 'offline' : 'online'),
      );
      setConnectionStatus(isConnected || false);
    });

    // Cleanup the event listener on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return <View />;
};

export default NetworkMonitor;
