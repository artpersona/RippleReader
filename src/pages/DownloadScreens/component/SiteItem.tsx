import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {NavigationRoutes} from '../../../utils';

type Props = {
  site: any;
};

function SiteItem({site}: Props) {
  const navigation = useNavigation() as any;
  const handlePress = async () => {
    navigation.navigate(NavigationRoutes.DOWNLOAD_SCREEN, {
      siteId: site.project_id,
    });
  };

  return (
    <TouchableOpacity style={[styles.container]} onPress={handlePress}>
      <View style={styles.detailsContainer}>
        <Text style={[styles.clusterName]}>{site.name}</Text>
      </View>
      <AntDesign name="right" size={30} color={colors.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  subText: {
    fontSize: 14,
    fontFamily: 'Popins-Regular',
    marginTop: 5,
  },
  clusterName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.white,
  },
  detailsContainer: {
    width: '80%',
  },
  container: {
    backgroundColor: colors.mutedBlue,
    padding: 10,
    paddingVertical: 20,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
  },
});

export default SiteItem;
