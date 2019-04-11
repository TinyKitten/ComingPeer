// @flow
import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

interface IProps {
  focused: boolean;
}

const HistoryStack = createStackNavigator({
  History: HistoryScreen
});

HistoryStack.navigationOptions = {
  tabBarIcon: (props: IProps) => {
    const { focused } = props;
    return (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'}
      />
    );
  },
  tabBarLabel: 'History'
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarIcon: (props: IProps) => {
    const { focused } = props;
    return (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
      />
    );
  },
  tabBarLabel: 'Settings'
};

export default createBottomTabNavigator({
  HistoryStack,
  SettingsStack
});
