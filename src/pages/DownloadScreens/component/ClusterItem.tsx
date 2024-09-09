import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
  cluster: any;
  onPress: () => void;
};

function ClusterItem({cluster, onPress}: Props) {
  const status = cluster.pending
    ? 'pending'
    : cluster.isDownloaded
    ? 'downloaded'
    : 'empty';

  let bgColor;
  let txtColor;
  switch (status) {
    case 'pending':
      bgColor = colors.primary;
      txtColor = colors.white;
      break;
    case 'downloaded':
      bgColor = '#5cb85c';
      txtColor = colors.white;
      break;
    case 'empty':
      bgColor = colors.white;
      txtColor = colors.primary;
      break;
    default:
      bgColor = colors.white;
      txtColor = colors.primary;
      break;
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          borderColor: txtColor,
        },
      ]}
      onPress={onPress}
      disabled={cluster.pending || cluster.isDownloaded}>
      <View style={styles.detailsContainer}>
        <Text
          style={[
            styles.clusterName,
            {
              color: txtColor,
            },
          ]}>
          {cluster.name}
        </Text>
        <Text
          style={[
            styles.subText,
            {
              color: txtColor,
            },
          ]}>
          Total Accounts: {cluster.count}
        </Text>
      </View>
      {cluster.pending ? (
        <ActivityIndicator color={txtColor} />
      ) : (
        <>
          {cluster.isDownloaded ? (
            <AntDesign name="check" size={30} color={txtColor} />
          ) : (
            <AntDesign name="clouddownload" size={30} color={txtColor} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  subText: {
    fontSize: 14,
    fontFamily: 'Popins-Regular',
    marginTop: 5,
  },
  clusterName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  detailsContainer: {
    width: '80%',
  },
  container: {
    backgroundColor: colors.danger,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
  },
});

export default ClusterItem;
