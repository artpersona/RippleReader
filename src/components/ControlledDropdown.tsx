import React from 'react';
import {StyleSheet} from 'react-native';
import {useController} from 'react-hook-form';
import {colors} from '../common';
import {Dropdown} from 'react-native-element-dropdown';

const ControlledDropdown = (props: any) => {
  const {control, name, rules, errors} = props;

  const {field} = useController({
    control,
    defaultValue: '',
    name,
    rules: rules,
  });

  return (
    <Dropdown
      style={
        errors[`${name}`]
          ? [
              styles.dropdown,
              {
                borderColor: colors.danger,
              },
            ]
          : styles.dropdown
      }
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={props.data ?? []}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={'Select item'}
      searchPlaceholder="Search..."
      value={field.value}
      onChange={item => {
        field.onChange(item.value);
      }}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default ControlledDropdown;
