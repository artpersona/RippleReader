import React from 'react';
import {Text, StyleSheet, Pressable, View} from 'react-native';
import {tabIcons} from '../utils/tabIcons';
import {colors} from '../common';
import {height} from '../common';

import {NavigationRoutes} from '../utils';

function CustomTabBar({state, descriptors, navigation, theme}: any) {
  const activeTintColor = colors.tertiary;

  return (
    <View style={styles.container}>
      {state.routes.map((stateRoute: any, index: any) => {
        const {options} = descriptors[stateRoute.key];
        const label = options.title || stateRoute.name;
        const isFocused = state.index === index;

        const color = activeTintColor;
        return (
          <View
            style={{
              flex: 1,
            }}>
            <Pressable
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: stateRoute.key,
                  canPreventDefault: true,
                });

                if (stateRoute.name === NavigationRoutes.MORE) {
                  navigation.navigate(NavigationRoutes.MORE_LANDING);
                  return;
                }
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(stateRoute.name);
                }
              }}
              key={stateRoute.key}
              style={styles.navItemRegular}>
              <View
                style={{
                  backgroundColor: isFocused
                    ? colors.tabActive
                    : colors.tertiary,
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingTop: 10,
                  paddingBottom: 20,
                  borderRadius: 5,
                }}>
                {tabIcons[label as keyof typeof tabIcons](color)}
                <Text style={[styles.label]}>{label}</Text>
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: colors.white,
    height: height * 0.085,
    backgroundColor: colors.tertiary,
  },
  navItemActive: {
    backgroundColor: 'white',
  },
  navItemRegular: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: 'transparent',
  },
  label: {
    fontSize: 11.5,
    marginTop: 3,
    fontFamily: 'Poppins-Light',
    textTransform: 'uppercase',
    color: colors.white,
  },
});

export default CustomTabBar;
