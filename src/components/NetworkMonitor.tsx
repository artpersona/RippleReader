import React, {useEffect} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {View} from 'react-native';
import {useUserStore} from '../stores';

const NetworkMonitor = () => {
  const {setConnectionStatus} = useUserStore() as any;
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const {isConnected} = state;
      console.log('Connection status:', isConnected);
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
