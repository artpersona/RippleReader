import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import useDownloadStore from '../../../stores/download.store';
import {CustomHeader} from '../../../components';
import QueueStatusItem from './components/QueueStatusItem';
type Props = {};

const statuses = [
  {
    id: '1',
    name: 'queued',
  },
  {
    id: '4',
    name: 'syncing',
  },
  {
    id: '2',
    name: 'completed',
  },
  {
    id: '3',
    name: 'printed',
  },
];

function QueueStatusSelector({}: Props) {
  const {filterData, setFilterData} = useDownloadStore() as any;

  const handleSelectStatus = (statusName: string) => {
    setFilterData({
      ...filterData,
      statusName,
    });
  };

  const renderItem = ({item}: any) => {
    return (
      <QueueStatusItem
        item={item}
        selectedCluster={filterData.statusName}
        onPress={handleSelectStatus}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Select Cluster" showBackButton />
      <FlatList
        data={statuses}
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

export default QueueStatusSelector;
