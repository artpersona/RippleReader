import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../common';
type Props = {
  message: string;
};

function ListEmpty({message}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.missingText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  missingText: {
    color: colors.mediumGray,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginTop: 30,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default ListEmpty;
