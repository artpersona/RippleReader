import {create} from 'zustand';
import {BleManager} from 'react-native-ble-plx';
import {PermissionsAndroid, Platform} from 'react-native';

interface BluetoothStoreState {
  connectedDevice: any | null;
  devices: any[];
  bluetoothManager: BleManager | null;
  isScanning: boolean;
  initializeBluetoothManager: () => void;
  requestBluetoothPermissions: () => Promise<boolean>;
  scanForDevices: () => void;
  stopDeviceScan: () => void;
  connectToDevice: (device: any) => void;
  setConnectedDevice: (device: any) => void;
}

const initialState = {
  connectedDevice: null,
  devices: [],
  bluetoothManager: null,
  isScanning: false,
};
const useBluetoothStore = create<BluetoothStoreState>((set, get) => ({
  ...initialState,

  initializeBluetoothManager: () => {
    const bleManager = new BleManager();
    set({bluetoothManager: bleManager});
  },

  requestBluetoothPermissions: async () => {
    if (
      Platform.OS === 'android' &&
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ) {
      const apiLevel = parseInt(Platform.Version.toString(), 10);

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      if (
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN &&
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      ) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        return (
          result['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED
        );
      }
    }

    return false;
  },

  scanForDevices: async () => {
    const {bluetoothManager} = get();
    if (!bluetoothManager) {
      return;
    }
    set({
      isScanning: true,
    });
    bluetoothManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }
      if (device && (device.name || device.localName)) {
        const {devices} = get();
        if (!devices.find(d => d.id === device.id)) {
          set({devices: [...devices, device]});
        }
      }
    });
  },

  stopDeviceScan: async () => {
    const {bluetoothManager} = get();
    if (!bluetoothManager) {
      return;
    }

    set({
      isScanning: false,
    });
    bluetoothManager.stopDeviceScan();
  },

  connectToDevice: async (device: any) => {
    const {bluetoothManager} = get();
    if (!bluetoothManager) {
      return;
    }
    try {
      const connectedDevice = await device.connect();
      await connectedDevice.discoverAllServicesAndCharacteristics();
      set({connectedDevice: device});
    } catch (e) {
      console.error(e);
    }
  },

  setConnectedDevice: (device: any) => {
    set({connectedDevice: device});
  },

  clearStore: () => set({...initialState}),
}));

export default useBluetoothStore;
