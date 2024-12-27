/* eslint-disable-react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {CustomHeader, AccountCard, ListEmpty} from '../../../components';
import {colors} from '../../../common';
import {FlatList} from 'react-native-gesture-handler';
import {NavigationRoutes} from '../../../utils';
import useDownloadStore from '../../../stores/download.store';
import ClusterSelector from './components/ClusterSelector';
import useMeterReadingStore from '../../../stores/meterReading.store';
import {Dropdown} from 'react-native-element-dropdown';

type Props = {
  navigation: any;
};

function HomeOffline({navigation}: Props) {
  const {downloadedClusterData, downloadClusters, activeKey, setActiveKey} =
    useDownloadStore() as any;
  const {projects, activeProject, setActiveProject} =
    useMeterReadingStore() as any;

  const [activeList, setActiveList] = useState([]);
  const [clusterList, setClusterList] = useState([]);

  useEffect(() => {
    if (
      downloadedClusterData &&
      Object.keys(downloadedClusterData).length > 0 &&
      activeKey === ''
    ) {
      setActiveKey(Object.keys(downloadedClusterData)[0]);
    }
  }, [downloadedClusterData, activeKey, setActiveKey]);

  useEffect(() => {
    if (activeKey) {
      setActiveList(downloadedClusterData[activeKey]);
    }
  }, [activeKey, downloadedClusterData, activeProject]);

  useEffect(() => {
    if (downloadClusters && downloadClusters.length > 0) {
      const tempClusters = downloadClusters
        .filter(
          (cluster: any) =>
            cluster.isDownloaded && cluster.site_id == activeProject,
        )
        .map((cluster: any) => {
          return {
            ...cluster,
            label: cluster.name,
            value: cluster.id,
          };
        });
      setClusterList(tempClusters);

      if (tempClusters.length === 0) {
        setActiveList([]);
      }
    }
  }, [downloadClusters, setActiveKey, activeKey, activeProject]);

  const handleClusterChange = (clusterId: string) => {
    setActiveKey(clusterId);
  };

  return (
    <View style={styles.bgWhite}>
      <CustomHeader
        chevronColor={colors.header}
        titleStyle={{
          color: colors.header,
        }}
        title="Offline Reading"
      />

      <View style={styles.content}>
        {projects && projects.length > 0 && (
          <View style={styles.projectContainer}>
            <Text style={styles.currentlyInText}>You are currently in</Text>
            <Dropdown
              data={projects}
              labelField="name"
              valueField="project_id"
              value={activeProject}
              onChange={(value: any) => {
                console.log(value);
                setActiveProject(value.project_id);
              }}
              style={styles.dropdown}
              placeholderStyle={{color: colors.white}}
              selectedTextStyle={{color: colors.white}}
              iconColor="white"
            />
          </View>
        )}
        <ClusterSelector
          clusters={clusterList}
          handleClusterChange={handleClusterChange}
          activeCluster={activeKey}
        />
        <FlatList
          data={activeList}
          // keyExtractor={(item: any) => item.id.toString()}
          renderItem={({item}: any) => (
            <AccountCard
              item={item}
              onPress={() =>
                navigation.navigate(NavigationRoutes.ACCOUNT_LANDING, {
                  isCompleted: false,
                  offlineData: item?.account_details,
                  accountNumber: item.account_number,
                  id: item.id,
                })
              }
            />
          )}
          ListEmptyComponent={<ListEmpty message="No meter to read found" />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  currentlyInText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.homeComponent,
  },
  dropdown: {
    marginTop: 5,
    padding: 10,
    backgroundColor: colors.primary,
    color: colors.white,
  },
  projectContainer: {
    marginBottom: 10,
  },
  loader: {
    marginTop: 50,
  },
  flex1: {
    flex: 1,
  },
  animatedSelector: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: 2,
    backgroundColor: colors.homeComponent,
  },
  optionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.homeComponent,
  },
  tabOption: {
    flex: 0.5,
    alignItems: 'center',
  },
  tabControl: {
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 7,
  },
  content: {
    marginHorizontal: 16,
    flex: 1,
  },
  iconContainer: {
    padding: 15,
    backgroundColor: colors.homeIcon,
    borderRadius: 10,
  },

  bannerHeader: {
    height: 182,
    width: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  bgWhite: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default HomeOffline;
