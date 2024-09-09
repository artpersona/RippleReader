import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import useDownloadStore from '../../stores/download.store';
import {CustomHeader} from '../../components';
import QueueItem from './component/QueueItem';
type Props = {};

function TaskQueue({}: Props) {
  const {pendingActions} = useDownloadStore() as any;

  console.log('pendingActions', pendingActions);
  return (
    <View style={styles.container}>
      <CustomHeader showBackButton title="Queued Actions" />
      <QueueItem />
      <QueueItem />
      <QueueItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TaskQueue;
