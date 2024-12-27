import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CustomHeader} from '../../components';
import {colors} from '../../common';
import {NavigationRoutes} from '../../utils';
type Props = {
  navigation: any;
};

function DownloadLanding({navigation}: Props) {
  return (
    <View style={styles.container}>
      <CustomHeader
        chevronColor={colors.header}
        titleStyle={{
          color: colors.header,
        }}
        title="Offline Support"
        showBackButton={true}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.itemCard}
          onPress={() => navigation.navigate(NavigationRoutes.SITE_LIST)}>
          <View style={styles.right}>
            <Ionicons name="download" size={40} color={'white'} />
            <Text style={styles.itemText}>Download Site Data</Text>
          </View>
          <Ionicons name="chevron-forward" size={25} color={'white'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemCard}
          onPress={() => navigation.navigate(NavigationRoutes.TASKQUEUE)}>
          <View style={styles.right}>
            <Ionicons name="cloud-upload" size={40} color={'white'} />
            <Text style={styles.itemText}>Sync up meter readings</Text>
          </View>
          <Ionicons name="chevron-forward" size={25} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  right: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  itemText: {
    color: 'white',
  },
  itemCard: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default DownloadLanding;
