import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../common';
type Props = {
  item: any;
  onPress: () => void;
};

function SupportCard({item, onPress}: Props) {
  console.log('item is: ', item);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.accountInfo}>
        {/* Banner will go here */}

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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  value: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.secondary,
  },
  label: {
    fontFamily: 'Poppins-Light',
    color: colors.homeComponent,
    fontSize: 12,
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

export default SupportCard;
