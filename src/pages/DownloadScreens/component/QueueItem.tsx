import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../common';
import {useNavigation} from '@react-navigation/native';
import {NavigationRoutes} from '../../../utils';

type Props = {
  item: any;
};

const {width} = Dimensions.get('window');

function QueueItem({item}: Props) {
  const navigation = useNavigation() as any;

  const icon: any = {
    queued: <Ionicons name="time-outline" size={40} color={colors.yellow} />,
    completed: (
      <Ionicons name="checkmark-done-circle-sharp" size={40} color={'green'} />
    ),
    printed: <Ionicons name="print" size={40} color={colors.primary} />,
  };

  const title: any = {
    queued: 'Queued',
    completed: 'Completed',
  };

  const editReading = () => {
    navigation.navigate(NavigationRoutes.OFFLINE_READING, {
      account: item.details.accountDetails,
      offlineReading: item.details?.readingDetails,
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={editReading}
      disabled={item.status !== 'queued'}>
      <View style={styles.infoContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.accountNumber}>
            {item?.details?.accountDetails?.account_number}
          </Text>
          <Text style={styles.accountName}>
            {item?.details?.accountDetails?.account_name}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          {icon[item.status]}
          <Text style={styles.subtext}>{title[item.status]}</Text>
        </View>
      </View>
      <View style={styles.queuedReading}>
        <View style={styles.readingDetails}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Previous Reading: </Text>
            <Text style={styles.value}>
              {item?.details?.readingDetails?.previous_reading ?? '0'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Present Reading: </Text>
            <Text style={styles.value}>
              {item?.details?.readingDetails?.present_reading}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Consumption: </Text>
            <Text style={styles.value}>
              {item?.details?.readingDetails?.consumption}
            </Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `data:image/gif;base64,${item?.details?.readingDetails?.attachment?.base64}`,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionButtons: {
    borderTopWidth: 1,
    borderColor: 'whitesmoke',
    marginTop: 5,
    paddingTop: 10,
  },
  value: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: colors.primary,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.mediumGray,
  },
  readingDetails: {
    flex: 0.5,
  },
  imageContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'whitesmoke',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: 'white',
    elevation: 2,
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    columnGap: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  queuedReading: {
    borderTopWidth: 1,
    borderColor: 'whitesmoke',
    marginTop: 5,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
    marginVertical: 10,
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
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.primary,
  },
});

export default QueueItem;
