import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, height} from '../../common';
import Logo from '../../assets/svg/logo.svg';
import Hero from '../../assets/svg/hero.svg';
import {Button} from 'react-native-paper';
import commonstyles from '../../styles/commonstyles';
import Animated from 'react-native-reanimated';
import {NavigationRoutes} from '../../utils';
import {moderateScale} from 'react-native-size-matters';

type Props = {
  navigation: any;
};

function AuthLanding({navigation}: Props) {
  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.gradientFrom, colors.gradientTo]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Logo width={60} height={68} />
          <Animated.Text style={styles.logoTitle}>
            Tubig Pilipinas
          </Animated.Text>
        </View>
        <Hero />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.handlebar} />
        <View style={styles.footerContent}>
          <Text style={styles.titleText}>Water Reader App</Text>
          <Text style={styles.descText}>
            Streamlines the process of reading and managing utility meters,
            improves efficiency and accuracy, and enhances customer service
          </Text>
        </View>
        <Button
          mode="contained"
          style={[
            commonstyles.button,
            commonstyles.bgPrimary,
            styles.footerButton,
          ]}
          onPress={() => navigation.navigate(NavigationRoutes.LOGIN)}
          contentStyle={commonstyles.buttonContent}
          labelStyle={[commonstyles.buttonLabel, commonstyles.colorWhite]}>
          Log In
        </Button>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  footerButton: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignSelf: 'center',
  },
  descText: {
    color: colors.mediumGray,
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(12),
    textAlign: 'center',
    marginTop: 10,
  },
  footerContent: {
    marginTop: 10,
  },
  titleText: {
    color: colors.tertiary,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: moderateScale(18),
    width: '80%',
    alignSelf: 'center',
  },
  handlebar: {
    width: '40%',
    height: 5,
    backgroundColor: colors.tertiary,
    marginVertical: 15,
    borderRadius: 100,
    alignSelf: 'center',
  },
  content: {
    marginTop: 50,
    alignItems: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.white,
    minHeight: height * 0.34,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoTitle: {
    fontFamily: 'SourceSerif4-SemiBold',
    color: colors.white,
    fontSize: moderateScale(19),
    marginLeft: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthLanding;
