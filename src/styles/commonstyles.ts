import {StyleSheet} from 'react-native';
import {colors} from '../common';
const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 22,
    color: colors.primary,
  },
  inputContainer: {
    marginBottom: 12,
    backgroundColor: colors.inputBackground,
    minHeight: 44,
    fontSize: 12,
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
