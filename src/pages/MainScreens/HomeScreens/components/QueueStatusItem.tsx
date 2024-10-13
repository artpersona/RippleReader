import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {colors} from '../../../../common';
type Props = {
  item: any;
  selectedCluster: any;
  onPress: any;
};

function QueueStatusItem({item, selectedCluster, onPress}: Props) {
  const [selected, setSelected] = useState(false);

  const handleSelectCluster = () => {
    setSelected(!selected);
    if (!selected) {
      onPress(item.name);
    } else {
      onPress(null);
    }
  };

  useEffect(() => {
    if (selectedCluster) {
      setSelected(selectedCluster === item.name);
    }
  }, [selectedCluster, item]);

  return (
    <TouchableOpacity
      style={styles.clusterContainer}
      onPress={handleSelectCluster}>
      <CheckBox
        style={styles.checkbox}
        tintColor={colors.lightGray}
        pointerEvents="none"
        value={selected}
      />
      <Text style={styles.clusterName}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 30,
    height: 30,
  },
  clusterName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginLeft: 16,
    textTransform: 'capitalize',
  },
  clusterContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default QueueStatusItem;
