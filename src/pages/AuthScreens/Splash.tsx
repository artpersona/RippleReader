import React, {useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../common';
import MeterLogo from '../../assets/svg/meter_logo.svg';
import {ActivityIndicator} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import {NavigationRoutes} from '../../utils';
import {moderateScale} from 'react-native-size-matters';

type Props = {
  navigation: any;
};

function Splash({navigation}: Props) {
  const {navigate} = navigation;

  useEffect(() => {
    let timer = setTimeout(() => {
      navigate(NavigationRoutes.AUTH_LANDING);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.gradientFrom, colors.gradientTo]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <MeterLogo />
      <Animated.Text style={styles.logoTitle}>Tubig Pilipinas</Animated.Text>
      <Text style={styles.subText}>Meter Reader App</Text>

      <ActivityIndicator
        animating={true}
        color={colors.white}
        style={styles.loader}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginTop: 20,
  },
  subText: {
    fontFamily: 'Poppins-LightItalic',
    color: colors.white,
    fontSize: moderateScale(16),
  },
  logoTitle: {
    fontFamily: 'SourceSerif4-Regular',
    color: colors.white,
    fontSize: moderateScale(32),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
