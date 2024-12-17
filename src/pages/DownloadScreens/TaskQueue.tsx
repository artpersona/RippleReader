import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import useDownloadStore from '../../stores/download.store';
import {CustomHeader, ListEmpty} from '../../components';
import QueueItem from './component/QueueItem';
import QueueFilter from './component/QueueFilter';
import {NavigationRoutes} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {Menu} from 'react-native-paper';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../common';
type Props = {};

function TaskQueue({}: Props) {
  const navigation = useNavigation() as any;
  const {
    pendingActions,
    filterData,
    setFilterData,
    downloadClusters,
    removePrintedActions,
    syncReadingList,
  } = useDownloadStore() as any;
  const [activeList, setActiveList] = useState([]);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [searchKey, setSearchKey] = useState('');

  const [visible, setVisible] = useState(false);
  /** HANDLERS & FUNCTIONS *********************************** */
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const navigateToClusterFilter = () => {
    navigation.navigate(NavigationRoutes.QueueClusterFilter);
  };

  const navigateToStatusFilter = () => {
    navigation.navigate(NavigationRoutes.QueueStatusFilter);
  };

  useEffect(() => {
    syncReadingList();
  }, []);

  useEffect(() => {
    if (downloadClusters) {
      const activeClusters = downloadClusters.filter((item: any) => {
        return item.isDownloaded;
      });
      if (activeClusters.length > 0) {
        setFilterData({
          clusterID: activeClusters[0].id,
          ...filterData,
        });
      } else {
        setFilterData({
          clusterID: null,
          ...filterData,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadClusters]);

  useEffect(() => {
    let tempActiveList = [...pendingActions] as any;
    if (filterData) {
      const count = Object.values(filterData).filter(
        value => value !== null && value !== '',
      ).length;
      setActiveFilterCount(count);
      // Filter by cluster
      if (filterData.clusterID) {
        tempActiveList = tempActiveList.filter(
          (item: any) => item.clusterID === filterData.clusterID,
        );
      }
      console.log('temp active list is: ', tempActiveList);
      // Filter by status name
      if (filterData.statusName) {
        tempActiveList = tempActiveList.filter(
          (item: any) =>
            item.status.toLowerCase() === filterData.statusName.toLowerCase(),
        );
      }
    }

    if (searchKey) {
      tempActiveList = tempActiveList.filter((item: any) => {
        const {account_name, account_number, address} =
          item.details.accountDetails;
        return (
          account_number.toLowerCase().includes(searchKey.toLowerCase()) ||
          account_name.toLowerCase().includes(searchKey.toLowerCase()) ||
          address.toLowerCase().includes(searchKey.toLowerCase())
        );
      });
    }

    setActiveList(tempActiveList);
  }, [filterData, pendingActions, searchKey]);

  const onChangeText = (text: string) => {
    setSearchKey(text);
  };

  useEffect(() => {
    setActiveList(pendingActions);
  }, [pendingActions]);

  const renderItem = ({item}: any) => {
    return <QueueItem item={item} />;
  };

  const handleRemovePrintedRecords = () => {
    removePrintedActions();
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        showBackButton
        title="Queued Actions"
        rightIcon={
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Octicons
                  name="kebab-horizontal"
                  color={colors.primary}
                  size={23}
                />
              </TouchableOpacity>
            }>
            <Menu.Item
              leadingIcon={() => (
                <MaterialIcons
                  name="delete-sweep"
                  color={colors.danger}
                  size={23}
                />
              )}
              onPress={() => {
                Alert.alert(
                  'Remove Printed Records',
                  'Are you sure you want to remove printed records?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => handleRemovePrintedRecords(),
                    },
                  ],
                  {cancelable: false},
                );
              }}
              title={'Remove printed records'}
            />
          </Menu>
        }
      />
      <View style={styles.wrapper}>
        <QueueFilter
          onChangeText={onChangeText}
          filterCount={activeFilterCount ? activeFilterCount - 1 : 0}
          navigateToClusterFilter={navigateToClusterFilter}
          navigateToStatusFilter={navigateToStatusFilter}
        />
        <FlatList
          renderItem={renderItem}
          data={activeList}
          ListEmptyComponent={<ListEmpty message="No queued action found" />}
          contentContainerStyle={styles.pb20P}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pb20P: {
    paddingBottom: '20%',
  },
  wrapper: {
    marginHorizontal: 10,
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default TaskQueue;
