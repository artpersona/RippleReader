import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../common';
import {moderateScale} from 'react-native-size-matters';

type Props = {
  item: any;
  onPress: () => void;
};

function SupportCard({item, onPress}: Props) {
  console.log('wew item: ', item);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.accountInfo}>
        <View style={styles.dataRow}>
          <Text style={styles.label}>CONTROL NO:</Text>
          <Text style={styles.value}>{item.control_no}</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.label}>NAME:</Text>
          <Text style={styles.value}>{item.account_name}</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.label}>ADDRESS:</Text>
          <Text style={styles.value}>{item.address}</Text>
        </View>
      </View>

      {item?.ccfType && (
        <View style={styles.typeContainer}>
          <Text style={styles.typeText}>{item.ccfType}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  typeText: {
    fontFamily: 'Poppins-Medium',
    color: colors.white,
    fontSize: moderateScale(12),
  },
  typeContainer: {
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  value: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(14),
    color: colors.secondary,
  },
  label: {
    fontFamily: 'Poppins-Light',
    color: colors.homeComponent,
    fontSize: moderateScale(12),
  },
  dataRow: {
    marginTop: 5,
  },
  accountInfo: {
    marginLeft: 5,
  },
  container: {
    backgroundColor: colors.filter,
    padding: 10,
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

export default SupportCard;
