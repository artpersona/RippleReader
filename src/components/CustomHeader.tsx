import React from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../common';
import {moderateScale} from 'react-native-size-matters';

type Props = {
  title?: string;
  titleStyle?: any;
  showBackButton?: boolean;
  rightIcon?: JSX.Element;
  chevronColor?: string;
  isTransparent?: boolean;
  backAction?: (() => void) | null;
};

const CustomHeader = ({
  title,
  titleStyle,
  rightIcon,
  showBackButton,
  chevronColor,
  isTransparent = false,
  backAction,
}: Props) => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View
      style={{
        ...styles.customHeaderContainer,
        height: isTransparent ? height * 0.085 : height * 0.07,
        marginTop:
          Platform.OS === 'android' ? height * 0.02 : StatusBar.currentHeight,
        backgroundColor: isTransparent ? 'transparent' : colors.white,
      }}>
      <View style={styles.customHeaderWrapper}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => (backAction ? backAction() : navigation.goBack())}
            style={styles.backButton}>
            <Feather
              name="chevron-left"
              size={22}
              color={chevronColor ? chevronColor : 'black'}
            />
          </TouchableOpacity>
        )}

        <View>
          <Text style={[styles.titleText, {...titleStyle}]}>{title}</Text>
        </View>

        <View style={styles.rightIcon}>{rightIcon}</View>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  rightIcon: {
    position: 'absolute',
    right: 16,
  },
  backButton: {
    marginRight: 10,
  },
  titleText: {
    fontSize: moderateScale(20),
    fontFamily: 'Poppins-Regular',
    color: colors.primary,
  },
  customHeaderWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    fontFamily: 'Inter-Regular',
    alignItems: 'center',
    height: '100%',
  },
  customHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
  },
  absoluteCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
});
