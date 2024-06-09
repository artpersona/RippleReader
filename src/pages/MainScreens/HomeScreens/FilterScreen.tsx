/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {CustomHeader} from '../../../components';
import {colors} from '../../../common';
import useMeterReadingStore from '../../../stores/meterReading.store';
import FilterItem from './components/FilterItem';
import commonstyles from '../../../styles/commonstyles';
import {Button} from 'react-native-paper';
type Props = {
  navigation?: any;
};

function FilterScreen({navigation}: Props) {
  const {
    loadClusters,
    clusters,
    setTempClusters,
    tempClusters,
    activeClusters,
    setActiveClusters,
  } = useMeterReadingStore() as any;
  const [hasUnsavedClusters, setHasUnsavedClusters] = React.useState(false);
  const handleSelect = (id: number) => {
    const tempData = [...tempClusters];
    const index = tempData.indexOf(id);
    if (index > -1) {
      tempData.splice(index, 1);
    } else {
      tempData.push(id);
    }
    setTempClusters(tempData);
  };

  const clearAll = () => {
    setTempClusters([]);
    setActiveClusters([]);
    setHasUnsavedClusters(false);
    navigation.goBack();
  };

  const saveChanges = () => {
    setActiveClusters(tempClusters);
    navigation.goBack();
  };

  const renderItem = ({item}: any) => {
    const isSelected = activeClusters.includes(item.id);
    return (
      <FilterItem
        handleSelect={handleSelect}
        id={item.id}
        name={item.name}
        key={item.id}
        defaultValue={isSelected}
      />
    );
  };

  useEffect(() => {
    loadClusters();
  }, []);

  useEffect(() => {
    const sortedActiveClusters = [...activeClusters].sort();
    const sortedTempClusters = [...tempClusters].sort();

    const tempHasUnsavedClusters =
      sortedActiveClusters.join() !== sortedTempClusters.join();

    setHasUnsavedClusters(tempHasUnsavedClusters && tempClusters.length > 0);
  }, [activeClusters, tempClusters]);

  useEffect(() => {
    setTempClusters(activeClusters);
  }, [activeClusters]);

  return (
    <View style={styles.container}>
      <CustomHeader title="Filter" showBackButton />
      <View style={styles.content}>
        <Text style={styles.title}>Filter by cluster</Text>
        <FlatList
          renderItem={renderItem}
          data={clusters}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
      {(activeClusters.length > 0 || hasUnsavedClusters) && (
        <View style={styles.floatingBottomContainer}>
          <Button
            mode="contained"
            onPress={clearAll}
            style={
              hasUnsavedClusters
                ? [commonstyles.button, styles.clearButton]
                : [commonstyles.button, styles.clearButton, styles.flexOne]
            }
            contentStyle={commonstyles.buttonContent}
            labelStyle={styles.clearLabel}>
            Clear All
          </Button>
          {hasUnsavedClusters && (
            <Button
              mode="contained"
              onPress={saveChanges}
              style={[commonstyles.button, styles.applyButton]}
              contentStyle={commonstyles.buttonContent}
              labelStyle={styles.applyLabel}>
              Apply Changes
            </Button>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  clearLabel: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.homeComponent,
  },
  applyLabel: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.white,
  },
  clearButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.homeComponent,
  },
  applyButton: {
    flex: 1,
    backgroundColor: colors.homeComponent,
  },
  floatingBottomContainer: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 15,
    backgroundColor: colors.white,
    width: '100%',
    borderTopWidth: 1,
    borderColor: 'whitesmoke',
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 10,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.header,
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 20,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default FilterScreen;
