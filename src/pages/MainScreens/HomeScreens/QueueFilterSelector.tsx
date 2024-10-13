import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import useDownloadStore from '../../../stores/download.store';
import {CustomHeader} from '../../../components';
import QueueClusterItem from './components/QueueClusterItem';
type Props = {};

function QueueFilterSelector({}: Props) {
  const {downloadClusters, filterData, setFilterData} =
    useDownloadStore() as any;
  const [activeClusters, setActiveClusters] = useState([]);

  useEffect(() => {
    if (downloadClusters) {
      let tempDownloadedClusters = [...downloadClusters] as any;
      tempDownloadedClusters = tempDownloadedClusters.filter((item: any) => {
        return item.isDownloaded;
      });

      setActiveClusters(tempDownloadedClusters ?? []);
    }
  }, [downloadClusters]);

  const handleSelectCluster = (clusterID: number) => {
    setFilterData({
      ...filterData,
      clusterID,
    });
  };

  const renderItem = ({item}: any) => {
    return (
      <QueueClusterItem
        item={item}
        selectedCluster={filterData.clusterID}
        onPress={handleSelectCluster}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Select Cluster" showBackButton />
      <FlatList
        data={activeClusters}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default QueueFilterSelector;
