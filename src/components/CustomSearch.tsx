import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../common';
type Props = {};

function CustomSearch({}: Props) {
  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search Name, Account Name, Address"
        activeUnderlineColor={colors.primary}
        underlineStyle={{borderWidth: 0, display: 'none'}}
        left={
          <TextInput.Icon
            icon={() => (
              <Ionicons name="search" size={25} color={colors.secondary} />
            )}
          />
        }
        contentStyle={styles.inputText}
      />
      <TouchableOpacity style={styles.filterIcon}>
        <Ionicons name="filter-outline" size={20} color={colors.secondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
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
  },
});

export default CustomSearch;
