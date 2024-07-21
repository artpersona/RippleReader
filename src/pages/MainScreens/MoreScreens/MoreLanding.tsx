import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, height} from '../../../common';
import Animated, {
  useSharedValue,
  withDelay,
  withSpring,
  FadeIn,
} from 'react-native-reanimated';
import {width} from '../../../common';
import {useUserStore} from '../../../stores';
import {moderateScale} from 'react-native-size-matters';

type Props = {
  navigation: any;
};

function MoreLanding({navigation}: Props) {
  let hiddenValue = -(width * 0.7);
  const {logout} = useUserStore() as any;

  const faqRight = useSharedValue(hiddenValue);
  const contactRight = useSharedValue(hiddenValue);
  const logoutRight = useSharedValue(hiddenValue);

  useEffect(() => {
    faqRight.value = withSpring(0, {damping: 60});
    contactRight.value = withDelay(100, withSpring(0, {damping: 60}));
    logoutRight.value = withDelay(200, withSpring(0, {damping: 60}));
  }, []);

  const navigateBack = () => {
    faqRight.value = withSpring(hiddenValue, {damping: 10, stiffness: 90});
    contactRight.value = withSpring(hiddenValue, {
      damping: 10,
      stiffness: 90,
    });
    logoutRight.value = withSpring(hiddenValue, {damping: 10, stiffness: 90});

    let goBackTimeout = setTimeout(() => {
      navigation.goBack();
    }, 100);

    return () => {
      clearTimeout(goBackTimeout);
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContainer}>
        <TouchableOpacity onPress={logout}>
          <Animated.Text
            style={[
              styles.settingText,
              {
                right: logoutRight,
              },
            ]}>
            Log out
          </Animated.Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={navigateBack} style={styles.bottomButton}>
        <Animated.Text
          style={styles.goBackText}
          entering={FadeIn.duration(1000)}>
          Go Back
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    position: 'absolute',
    bottom: height * 0.1,
    alignSelf: 'center',
  },
  goBackText: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(16),
  },
  centeredContainer: {
    flex: 0.4,
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginTop: '-20%',
  },
  settingText: {
    textTransform: 'uppercase',
    color: colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(20),
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.tertiary,
    justifyContent: 'center',
  },
});

export default MoreLanding;
