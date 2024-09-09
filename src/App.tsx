import React from 'react';
import {View, Platform} from 'react-native';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {colors} from './common';
import Toast from 'react-native-toast-message';
import MainStack from './navigation/MainNavigation';
import {moderateScale} from 'react-native-size-matters';
import NetworkMonitor from './components/NetworkMonitor';
import NetInfo from '@react-native-community/netinfo';
const MyStatusBar = ({backgroundColor, ...props}: any) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

function App(): React.JSX.Element {
  // Subscribe
  const unsubscribe = NetInfo.addEventListener(state => {
    // console.log('Connection type', state.type);
    // console.log('Is connected?', state.isConnected);
    alert(
      'Connection type: ' + state.type + '\nIs connected? ' + state.isConnected,
    );
  });

  // Unsubscribe
  unsubscribe();

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar backgroundColor={colors.tertiary} barStyle="light-content" />

      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
      <Toast />
      <NetworkMonitor />
    </SafeAreaView>
  );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: colors.tertiary,
    height: APPBAR_HEIGHT,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: moderateScale(24),
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: moderateScale(18),
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
