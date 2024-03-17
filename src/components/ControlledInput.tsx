import React from 'react';
import {TextInput} from 'react-native-paper';
import {useController} from 'react-hook-form';
import {colors} from '../common';

const ControlledInput = (props: any) => {
  const {control, name, rules, defaultValue} = props;

  const {field} = useController({
    control,
    defaultValue: defaultValue ?? '',
    name,
    rules: rules,
  });

  return (
    <TextInput
      {...props}
      autoCapitalize="none"
      value={field.value}
      onChangeText={field.onChange}
      underlineColor="transparent"
      contentStyle={{fontFamily: 'Roboto-Light'}}
      outlineStyle={{borderWidth: 1}}
      theme={{
        colors: {
          onSurfaceVariant: colors.mutedText,
        },
      }}
    />
  );
};

export default ControlledInput;
