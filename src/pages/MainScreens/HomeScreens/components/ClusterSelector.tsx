import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../../../common';
import {Dropdown} from 'react-native-element-dropdown';
import {moderateScale} from 'react-native-size-matters';
type Props = {
  clusters: any[];
  handleClusterChange: (clusterId: string) => void;
  activeCluster: string;
};

function ClusterSelector({
  handleClusterChange,
  clusters,
  activeCluster,
}: Props) {
  const [value, setValue] = useState(activeCluster);
  const [clusterName, setClusterName] = useState('');

  const handleValueChange = (clusterId: string) => {
    setValue(clusterId);
    handleClusterChange(clusterId);
  };

  useEffect(() => {
    if (activeCluster) {
      setValue(activeCluster);

      const cluster = clusters.find(
        (temp: any) => temp.value === activeCluster,
      );
      if (cluster) {
        setClusterName(cluster.label);
      }
    }
  }, [activeCluster, setClusterName, clusters]);

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={clusters ?? []}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Select item'}
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          handleValueChange(item.value);
        }}
      />
      {activeCluster && (
        <Text style={styles.activeText}>
          Showing downloaded data for {clusterName}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  activeText: {
    fontSize: moderateScale(12),
    fontFamily: 'Poppins-Italic',
    marginTop: 10,
    color: colors.mediumGray,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dropdown: {
    height: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: 10,
    borderRadius: 5,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: moderateScale(16),
  },
  placeholderStyle: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Regular',
  },
  selectedTextStyle: {
    fontSize: moderateScale(16),
  },
  contentText: {
    color: colors.mediumGray,
  },
  clusterContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.lightGray,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 5,
  },
  container: {
    marginVertical: 20,
  },
});

export default ClusterSelector;
