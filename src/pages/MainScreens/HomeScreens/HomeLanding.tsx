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
  AccountCard,
  ListEmpty,
} from '../../../components';
import {colors} from '../../../common';
import PagerView from 'react-native-pager-view';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {width} from '../../../common';
import useMeterReadingStore from '../../../stores/meterReading.store';
import {FlatList} from 'react-native-gesture-handler';
import {NavigationRoutes} from '../../../utils';
import {useFocusEffect} from '@react-navigation/native';
import {debounce} from 'lodash';

type Props = {
  navigation: any;
};

function HomeLanding({navigation}: Props) {
  const sliderRight = useSharedValue(0);
  const pagerRef = React.useRef(null) as any;
  const {
    loadMeterReaderLists,
    readingList,
    completedList,
    activeClusters,
    searchText,
    loading,
  } = useMeterReadingStore() as any;

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
      loadMeterReaderLists(
        searchText,
        activeClusters.length > 0 ? activeClusters.join(',') : '',
      );
    }, [activeClusters, searchText]),
  );

  const onChangeText = debounce((text: string) => {
    loadMeterReaderLists(text, activeClusters);
  }, 300); // 300ms delay

  console.log('completed list', completedList);
  return (
    <View style={styles.bgWhite}>
      <CustomHeader
        chevronColor={colors.header}
        titleStyle={{
          color: colors.header,
        }}
        title="Meter Reading"
      />

      <View style={styles.content}>
        <CustomSearch onChangeText={onChangeText} />

        <View style={styles.tabControl}>
          <TouchableWithoutFeedback onPress={() => onTabPress(0)} disabled>
            <View style={styles.tabOption}>
              <Text style={styles.optionText}>For Readings</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => onTabPress(1)} disabled>
            <View style={styles.tabOption}>
              <Text style={styles.optionText}>Completed</Text>
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
                data={readingList}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({item}: any) => (
                  <AccountCard
                    item={item}
                    onPress={() =>
                      navigation.navigate(NavigationRoutes.ACCOUNT_LANDING, {
                        isCompleted: false,
                        accountNumber: item.account_number,
                        id: item.id,
                      })
                    }
                  />
                )}
                ListEmptyComponent={
                  <ListEmpty message="No meter to read found" />
                }
              />
            </View>
            <View key="2">
              <FlatList
                data={completedList}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({item}: any) => (
                  <AccountCard
                    item={item}
                    onPress={() =>
                      navigation.navigate(NavigationRoutes.ACCOUNT_LANDING, {
                        isCompleted: true,
                        accountNumber: item.account_number,
                        id: item.id,
                      })
                    }
                  />
                )}
                ListEmptyComponent={
                  <ListEmpty message="No meter to read found" />
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

export default HomeLanding;
