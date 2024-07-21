import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomHeader} from '../../../components';
import {colors} from '../../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {NavigationRoutes} from '../../../utils';
import {moderateScale} from 'react-native-size-matters';

type Props = {
  navigation: any;
};

function Selection({navigation}: Props) {
  return (
    <View style={styles.container}>
      <CustomHeader
        title="Meter Actions"
        titleStyle={{
          color: colors.header,
        }}
      />
      <View style={styles.mainContent}>
        <Text style={styles.subHeader}>
          Providing comprehensive functionality for managing disconnections and
          replacements of water meters with ease and efficiency.
        </Text>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate(NavigationRoutes.HOME_LANDING)}>
          <AntDesign
            name="exclamationcircle"
            size={50}
            color={colors.primary}
          />
          <Text style={styles.cardTitle}>Disconnection / Reconnection</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate(NavigationRoutes.OTHER_ACTIONS_LANDING)
          }>
          <Octicons name="kebab-horizontal" size={50} color={colors.primary} />
          <Text style={styles.cardTitle}>Other Actions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.primary,
    fontSize: moderateScale(16),
    marginTop: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: colors.historyCard,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    height: 200,
    width: '100%',
    justifyContent: 'center',
  },
  subHeader: {
    fontFamily: 'Poppins-Regular',
    color: '#898A8D',
    fontSize: moderateScale(12),
  },
  mainContent: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Selection;
