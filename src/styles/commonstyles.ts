import {StyleSheet} from 'react-native';
import {colors} from '../common';
import {moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(22),
    color: colors.primary,
  },
  inputContainer: {
    marginBottom: 12,
    backgroundColor: colors.inputBackground,
    minHeight: 44,
    fontSize: moderateScale(12),
    fontFamily: 'Roboto-Light',
    color: 'yellow',
  },
  button: {
    borderRadius: 5,
  },
  buttonContent: {
    paddingVertical: 5,
  },
  bgPrimary: {
    backgroundColor: colors.primary,
  },
  bgError: {
    backgroundColor: colors.danger,
  },
  colorPrimary: {
    color: colors.primary,
  },
  bgWhite: {
    backgroundColor: colors.white,
  },
  colorWhite: {
    color: colors.white,
  },
  buttonLabel: {
    fontFamily: 'Poppins-SemiBold',
  },
});

export default styles;
