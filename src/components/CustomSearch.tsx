/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../common';
import {useNavigation} from '@react-navigation/native';
import {NavigationRoutes} from '../utils';
import useMeterReadingStore from '../stores/meterReading.store';
import {Badge} from 'react-native-paper';
type Props = {
  onChangeText: (text: string) => void;
};

function CustomSearch({onChangeText}: Props) {
  const navigation = useNavigation() as any;
  const {activeClusters} = useMeterReadingStore() as any;

  const navigateToFilter = () => {
    navigation.navigate(NavigationRoutes.FILTER_SCREEN);
  };
  return (
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
          activeClusters.length > 0
            ? [styles.filterIcon, styles.active]
            : styles.filterIcon
        }
        onPress={navigateToFilter}>
        {activeClusters.length > 0 && (
          <Badge
            visible={activeClusters.length > 0}
            size={30}
            style={styles.badge}>
            {activeClusters.length}
          </Badge>
        )}

        <Ionicons
          name="filter-outline"
          size={20}
          color={activeClusters.length > 0 ? colors.white : colors.secondary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});

export default CustomSearch;
