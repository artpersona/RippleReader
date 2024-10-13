/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../common';
// import {useNavigation} from '@react-navigation/native';
import {Badge} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import useDownloadStore from '../../../stores/download.store';
type Props = {
  onChangeText: (text: string) => void;
  filterCount: number;
  navigateToClusterFilter: () => void;
  navigateToStatusFilter: () => void;
};

function QueueFilter({
  onChangeText,
  filterCount,
  navigateToClusterFilter,
  navigateToStatusFilter,
}: Props) {
  //   const navigation = useNavigation() as any

  const {downloadClusters, filterData} = useDownloadStore() as any;
  const [selectedCluster, setSelectedCluster] = React.useState<any>(null);

  useEffect(() => {
    if (downloadClusters) {
      const activeClusters = downloadClusters.filter((item: any) => {
        return item.isDownloaded;
      });
      if (activeClusters.length > 0) {
        console.log('filterData', filterData);
        const currentActiveCluster =
          activeClusters.find(
            (item: any) => item.id === filterData.clusterID,
          ) ?? null;

        setSelectedCluster(currentActiveCluster);
      }
    }
  }, [filterData, downloadClusters]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.clusterSelection}
        onPress={navigateToClusterFilter}>
        <Feather name="chevron-right" size={20} color={colors.white} />
        <Text style={styles.selectionText}>Showing records for</Text>
        <Text style={styles.selectedCluster}>
          {selectedCluster?.name ?? '----'}
        </Text>
      </TouchableOpacity>
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Name, Account Name, Address"
          activeUnderlineColor={colors.primary}
          underlineStyle={styles.underlineStyle}
          left={
            <TextInput.Icon
              icon={() => (
                <Ionicons name="search" size={25} color={colors.secondary} />
              )}
            />
          }
          contentStyle={styles.inputText}
          onChangeText={text => onChangeText(text)}
        />
        <TouchableOpacity
          style={
            filterCount > 0
              ? [styles.filterIcon, styles.active]
              : styles.filterIcon
          }
          onPress={navigateToStatusFilter}>
          {filterCount > 0 && (
            <Badge visible={filterCount > 0} size={30} style={styles.badge}>
              {filterCount}
            </Badge>
          )}

          <Ionicons
            name="filter-outline"
            size={20}
            color={filterCount > 0 ? colors.white : colors.secondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedCluster: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: moderateScale(12),
    color: colors.white,
  },
  selectionText: {
    marginRight: 5,
    color: colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(12),
  },
  clusterSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  container: {
    marginTop: 10,
  },
  active: {
    backgroundColor: colors.primary,
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  underlineStyle: {
    borderWidth: 0,
    display: 'none',
  },
  inputText: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(12),
  },
  filterIcon: {
    flex: 0.18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.filter,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 5,
    marginVertical: 3,
  },
  input: {
    flex: 0.88,
    borderWidth: 4,
    borderColor: colors.filter,
    backgroundColor: colors.white,
    shadowColor: colors.filter,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 5,
  },
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
});

export default QueueFilter;
