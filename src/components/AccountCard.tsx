import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../common';
import {moderateScale} from 'react-native-size-matters';
import {ACCOUNT_STATUSES} from '../common/constants';

type Props = {
  item: any;
  onPress: () => void;
};

function AccountCard({item, onPress}: Props) {
  let bgColor = colors.filter;
  let labelColor = colors.secondary;
  let borderColor = colors.primary;
  let titleColor = colors.homeComponent;

  if (item.status !== '1') {
    bgColor = colors.mutedRed;
    labelColor = colors.white;
    borderColor = colors.vibrantRed;
    titleColor = colors.white;
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          borderLeftColor: borderColor,
        },
      ]}
      onPress={onPress}>
      <View style={styles.accountInfo}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={styles.dataRow}>
            <Text
              style={[
                styles.label,
                {
                  color: titleColor,
                },
              ]}>
              ACCOUNT NO:
            </Text>
            <Text
              style={[
                styles.value,
                {
                  color: labelColor,
                },
              ]}>
              {item.account_number}
            </Text>
          </View>
          {item?.status !== '1' && (
            <View style={styles.statusCoding}>
              <Text style={styles.statusText}>
                {ACCOUNT_STATUSES[item?.status ?? 1]}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.dataRow}>
          <Text
            style={[
              styles.label,
              {
                color: titleColor,
              },
            ]}>
            NAME:
          </Text>
          <Text
            style={[
              styles.value,
              {
                color: labelColor,
              },
            ]}>
            {item.account_name}
          </Text>
        </View>

        <View style={styles.dataRow}>
          <Text
            style={[
              styles.label,
              {
                color: titleColor,
              },
            ]}>
            ADDRESS:
          </Text>
          <Text
            style={[
              styles.value,
              {
                color: labelColor,
              },
            ]}>
            {item.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  statusText: {
    textTransform: 'uppercase',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: colors.vibrantRed,
  },
  statusCoding: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
  },
  value: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(14),
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
    padding: 10,
    borderLeftWidth: 5,
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
