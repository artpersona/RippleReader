import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../common';
import {moderateScale} from 'react-native-size-matters';

type Props = {
  item: any;
  onPress: () => void;
};

function AccountCard({item, onPress}: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.accountInfo}>
        <View style={styles.dataRow}>
          <Text style={styles.label}>ACCOUNT NO:</Text>
          <Text style={styles.value}>{item.account_number}</Text>
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  },
});

export default AccountCard;
