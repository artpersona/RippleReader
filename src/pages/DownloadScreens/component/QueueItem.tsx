import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../../common';
type Props = {};

function QueueItem({}: Props) {
  const icon = {
    queued: <Ionicons name="time-outline" size={40} color={colors.primary} />,
    uploading: (
      <MaterialIcons name="pending-actions" size={40} color={colors.primary} />
    ),
  };

  const title = {
    queued: 'Queued',
    uploading: 'Uploading',
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.accountNumber}>014-01-01-00050</Text>
        <Text style={styles.accountName}>MALAWAG BRGY MALAWAG</Text>
      </View>

      <View style={styles.statusContainer}>
        {icon.queued}
        <Text style={styles.subtext}>{title.queued}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.mediumGray,
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  accountName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.mediumGray,
  },
  accountNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: colors.primary,
  },
  detailsContainer: {
    gap: 5,
  },
  container: {
    margin: 10,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.primary,
  },
});

export default QueueItem;
