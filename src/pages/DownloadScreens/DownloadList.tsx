import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {CustomHeader, ListEmpty} from '../../components';
import {colors} from '../../common';
import ClusterItem from './component/ClusterItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useDownloadStore from '../../stores/download.store';
type Props = {
  route: any;
};

function DownloadList({route}: Props) {
  const {downloadClusters, loadClusters, clusterLoading} =
    useDownloadStore() as any;

  useEffect(() => {
    if (route.params?.siteId) {
      loadClusters(parseInt(route.params?.siteId, 10));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.siteId]);

  return (
    <View style={styles.whiteBG}>
      <CustomHeader
        chevronColor={colors.header}
        titleStyle={{
          color: colors.header,
        }}
        title="Offline Support"
        showBackButton={true}
      />

      <View style={styles.notesContainer}>
        <Ionicons name="information-circle" size={40} color={colors.white} />
        <View style={styles.notesText}>
          <Text style={styles.title}>Offline Reading Data</Text>
          <Text style={styles.subtitle}>
            Download cluster data to read offline or on low bandwith
          </Text>
        </View>
      </View>

      <ScrollView style={styles.container}>
        {clusterLoading && (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{marginTop: 16}}
          />
        )}
        {!clusterLoading && (
          <>
            {downloadClusters.map((cluster: any) => {
              return <ClusterItem key={cluster.id} cluster={cluster} />;
            })}
            {downloadClusters.length === 0 && (
              <ListEmpty message="No cluster data available" />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  whiteBG: {
    backgroundColor: colors.white,
    flex: 1,
  },
  subtitle: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  notesText: {
    marginLeft: 8,
    width: '85%',
    paddingVertical: 5,
  },
  notesContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    marginTop: 16,
  },
});

export default DownloadList;
