/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {
  CustomHeader,
  CustomSearch,
  SupportCard,
  ListEmpty,
} from '../../../components';
import {colors} from '../../../common';
import useMeterReadingStore from '../../../stores/meterReading.store';

import {FlatList} from 'react-native-gesture-handler';
import {NavigationRoutes} from '../../../utils';
import {useFocusEffect} from '@react-navigation/native';
import {debounce} from 'lodash';
import useMaintenanceStore from '../../../stores/maintenance.store';

type Props = {
  navigation: any;
};

function OtherActionsLanding({navigation}: Props) {
  const {activeClusters, searchText, loading} = useMeterReadingStore() as any;
  const {otherActionsList, loadOtherActionsList, ccfTypes} =
    useMaintenanceStore() as any;

  const [formattedOtherActions, setFormattedOtherActions] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      loadOtherActionsList(
        searchText,
        activeClusters.length > 0 ? activeClusters.join(',') : '',
      );
    }, [activeClusters, searchText]),
  );

  const onChangeText = debounce((text: string) => {
    loadOtherActionsList(text, activeClusters);
  }, 300);

  useEffect(() => {
    if (otherActionsList) {
      const formattedList = otherActionsList.map((item: any) => {
        console.log('ccft types', ccfTypes, item.type);
        const ccfType = ccfTypes.find((ccf: any) => ccf.id === item.type);
        return {
          ...item,
          ccfType: ccfType?.name,
        };
      });
      setFormattedOtherActions(formattedList);
    }
  }, [otherActionsList, ccfTypes]);

  return (
    <View style={styles.bgWhite}>
      <CustomHeader
        showBackButton={true}
        chevronColor={colors.header}
        titleStyle={{
          color: colors.header,
        }}
        title="Other Actions"
      />

      <View style={styles.content}>
        <CustomSearch onChangeText={onChangeText} />
        <View style={styles.mainContent}>
          {loading && (
            <ActivityIndicator
              size={'large'}
              color={colors.homeComponent}
              style={styles.loader}
            />
          )}

          {!loading && (
            <FlatList
              data={formattedOtherActions}
              renderItem={({item}: any) => (
                <SupportCard
                  item={item}
                  onPress={() =>
                    navigation.navigate(NavigationRoutes.ACTION_SCREEN, {
                      account: item,
                    })
                  }
                />
              )}
              ListEmptyComponent={
                <ListEmpty message="No support tickets found" />
              }
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    marginTop: 10,
  },
  loader: {
    marginTop: 50,
  },
  flex1: {
    flex: 1,
  },
  animatedSelector: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: 2,
    backgroundColor: colors.homeComponent,
  },
  optionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.homeComponent,
  },
  tabOption: {
    flex: 0.5,
    alignItems: 'center',
  },
  tabControl: {
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 7,
  },
  content: {
    marginHorizontal: 16,
    flex: 1,
  },
  iconContainer: {
    padding: 15,
    backgroundColor: colors.homeIcon,
    borderRadius: 10,
  },

  bannerHeader: {
    height: 182,
    width: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  bgWhite: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default OtherActionsLanding;
