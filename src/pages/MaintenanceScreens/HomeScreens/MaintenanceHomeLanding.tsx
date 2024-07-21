/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {
  CustomHeader,
  CustomSearch,
  SupportCard,
  ListEmpty,
} from '../../../components';
import {colors} from '../../../common';
import PagerView from 'react-native-pager-view';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {width} from '../../../common';
import useMeterReadingStore from '../../../stores/meterReading.store';
import useMaintenanceStore from '../../../stores/maintenance.store';
import {FlatList} from 'react-native-gesture-handler';
import {NavigationRoutes} from '../../../utils';
import {useFocusEffect} from '@react-navigation/native';
import {debounce} from 'lodash';
import {moderateScale} from 'react-native-size-matters';

type Props = {
  navigation: any;
};

function MaintenanceHomeLanding({navigation}: Props) {
  const sliderRight = useSharedValue(0);
  const pagerRef = React.useRef(null) as any;
  const {loadMeterReaderLists, activeClusters, searchText, loading} =
    useMeterReadingStore() as any;

  const {disconnectionList, reconnectionList, loadMaintenanceList} =
    useMaintenanceStore() as any;

  const onTabPress = (index: number) => {
    loadMeterReaderLists();
    if (index === 0) {
      sliderRight.value = withTiming(0);
    }
    if (index === 1) {
      sliderRight.value = withTiming(width / 2 - 16);
    }
    pagerRef?.current?.setPage(index);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadMaintenanceList(
        searchText,
        activeClusters.length > 0 ? activeClusters.join(',') : '',
      );
    }, [activeClusters, searchText]),
  );

  const onChangeText = debounce((text: string) => {
    loadMaintenanceList(text);
  }, 300); // 300ms delay

  return (
    <View style={styles.bgWhite}>
      <CustomHeader
        showBackButton={true}
        chevronColor={colors.header}
        titleStyle={{
          color: colors.header,
        }}
        title="Disconnection / Reconnection"
      />

      <View style={styles.content}>
        <CustomSearch onChangeText={onChangeText} />

        <View style={styles.tabControl}>
          <TouchableWithoutFeedback onPress={() => onTabPress(0)}>
            <View style={styles.tabOption}>
              <Text style={styles.optionText}>Disconnection</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => onTabPress(1)}>
            <View style={styles.tabOption}>
              <Text style={styles.optionText}>Reconnection</Text>
            </View>
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.animatedSelector,
              {
                left: sliderRight,
              },
            ]}
          />
        </View>
        {loading && (
          <ActivityIndicator
            size={'large'}
            color={colors.homeComponent}
            style={styles.loader}
          />
        )}
        {!loading && (
          <PagerView
            style={styles.flex1}
            ref={pagerRef}
            onPageScroll={event => {
              const {offset, position} = event.nativeEvent;
              const tabWidth = width / 2 - 16;
              sliderRight.value = position * tabWidth + offset * tabWidth;
            }}>
            <View key="1">
              <FlatList
                data={disconnectionList}
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
            </View>
            <View key="2">
              <FlatList
                data={reconnectionList}
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
            </View>
          </PagerView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: moderateScale(14),
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

export default MaintenanceHomeLanding;
