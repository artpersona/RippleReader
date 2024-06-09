import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {colors} from '../../../../common';
type Props = {
  id: number;
  name: string;
  handleSelect: (id: number) => void;
  defaultValue?: boolean;
};

function FilterItem({id, name, handleSelect, defaultValue}: Props) {
  const [selected, setSelected] = useState(false);

  const handleToggle = () => {
    handleSelect(id);
    setSelected(!selected);
  };

  useEffect(() => {
    setSelected(defaultValue ?? false);
  }, [defaultValue]);
  return (
    <TouchableOpacity style={styles.container} onPress={handleToggle}>
      <Text style={styles.label}>{name}</Text>
      <CheckBox
        disabled={false}
        value={selected}
        boxType="square"
        style={styles.checkbox}
        tintColor={colors.lightGray}
        pointerEvents="none"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  container: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default FilterItem;
