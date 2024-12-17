import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomHeader} from '../../../components';
import {colors} from '../../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {NavigationRoutes} from '../../../utils';
import {moderateScale} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';
import useMeterReadingStore from '../../../stores/meterReading.store';
type Props = {
  navigation: any;
};

function Selection({navigation}: Props) {
  const {projects, activeProject, setActiveProject} =
    useMeterReadingStore() as any;

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Meter Actions"
        titleStyle={{
          color: colors.header,
        }}
      />
      <View style={styles.mainContent}>
        {projects && projects.length > 0 && (
          <View style={styles.projectContainer}>
            <Text style={styles.currentlyInText}>You are currently in</Text>
            <Dropdown
              data={projects}
              labelField="name"
              valueField="project_id"
              value={activeProject}
              onChange={(value: any) => {
                console.log(value);
                setActiveProject(value.project_id);
              }}
              style={styles.dropdown}
              placeholderStyle={{color: colors.white}}
              selectedTextStyle={{color: colors.white}}
              iconColor="white"
            />
          </View>
        )}

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
  currentlyInText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.homeComponent,
  },
  dropdown: {
    marginTop: 5,
    padding: 10,
    backgroundColor: colors.primary,
    color: colors.white,
  },
  projectContainer: {
    marginBottom: 10,
  },
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
