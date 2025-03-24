import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import useBluetoothStore from '../../../stores/bluetooth.store';
import {CustomHeader} from '../../../components';
import {Button} from 'react-native-paper';
import {usePrintersDiscovery, Printer} from 'react-native-esc-pos-printer';

type Props = {};

function ScannedDevices({navigation}: Props) {
  const {start, isDiscovering, printers} = usePrintersDiscovery();

  const {
    devices,
    stopDeviceScan,
    scanForDevices,
    isScanning,
    connectedDevice,
    setConnectedDevice,
  } = useBluetoothStore();

  // useEffect(() => {
  //   scanForDevices();
  // }, []);

  return (
    <View style={styles.container}>
      <CustomHeader showBackButton={true} title="Device Manager" />

      <ScrollView>
        {printers &&
          printers
            ?.filter((printer: any) => {
              return printer?.deviceName;
            })
            ?.map((printer: any, index: number) => (
              <Pressable
                key={index}
                style={styles.deviceContainer}
                onPress={() => {
                  setConnectedDevice(printer);
                  navigation.goBack();
                }}>
                <View>
                  <Text>{printer.deviceName}</Text>
                  <Text>{printer.target}</Text>
                </View>
              </Pressable>
            ))}
      </ScrollView>

      {/* <ScrollView>
        {devices &&
          devices
            ?.filter((device: any) => {
              return device?.name || device?.localName;
            })
            ?.map((device: any, index: number) => (
              <Pressable key={index} style={styles.deviceContainer}>
                <View>
                  <Text>
                    {device?.name ?? device?.localName ?? 'No Device Name'}
                  </Text>
                  <Text>{device.id}</Text>
                </View>
              </Pressable>
            ))}
      </ScrollView> */}

      <View style={styles.absoluteBottomContainer}>
        {/* <Button
          mode="contained"
          onPress={() => {
            isScanning ? stopDeviceScan() : scanForDevices();
          }}>
          {isScanning ? 'Stop Scanning' : 'Start Scanning'}
        </Button> */}

        <Button
          mode="contained"
          onPress={() => {
            start();
          }}>
          {isDiscovering ? 'Stop Scanning' : 'Start Scanning'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deviceContainer: {
    padding: 10,
    backgroundColor: 'white',
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  absoluteBottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  container: {
    flex: 1,
  },
});

export default ScannedDevices;
