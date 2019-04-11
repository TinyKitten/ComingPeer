import {
  Constants,
  Location,
  Notifications,
  Permissions,
  TaskManager
} from 'expo';
import React, { Dispatch } from 'react';
import {
  Alert,
  GeolocationReturnType,
  Platform,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';

import { API_URL } from '../settings';
import * as historyActions from './actions/history';
import { fetchSettingsAsync } from './actions/settings';
import { sendLocation } from './api';
import { ILocationCallback } from './models/LocationCallback';
import { ILocationSendPayload } from './models/LocationSendPayload';
import { ISettings } from './models/Settings';
import AppNavigator from './navigation/AppNavigator';
import { IAppState } from './reducers';

interface IDefineTaskCallback {
  data: {
    locations: GeolocationReturnType[];
  };
  error: Error;
}

const TASK_NAME = 'coming_location_task';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});

interface IProps {
  addHistory: (history: ILocationCallback) => void;
  settings: ISettings | null;
  histories: ILocationCallback[];
  fetchSettings: () => void;
}

class Root extends React.Component<IProps> {
  public componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert(
        '位置情報取得エラー',
        'Androidエミュレータでは使えません',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      this.getLocationAsync();
      this.askNotificationsPermission();
    }

    this.props.fetchSettings();
  }

  public getLocationAsync = async () => {
    const locationPermissionResult = await Permissions.askAsync(
      Permissions.LOCATION
    );
    if (locationPermissionResult.status !== 'granted') {
      await Permissions.askAsync(Permissions.LOCATION);
    }

    await Location.startLocationUpdatesAsync(TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
      distanceInterval: 100
    });
    TaskManager.defineTask(
      TASK_NAME,
      ({ data: { locations }, error }: IDefineTaskCallback) => {
        if (error) {
          return;
        }
        this.sendLocation(locations[0]);
      }
    );
  };

  public askNotificationsPermission = async () => {
    const notificationsPermissionResult = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    if (notificationsPermissionResult.status !== 'granted') {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
  };

  public async sendLocation(location: GeolocationReturnType) {
    const { settings, addHistory } = this.props;
    if (!settings || !settings.peerToken) {
      return;
    }

    const data: ILocationSendPayload = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      token: settings.peerToken
    };

    const response = await sendLocation(settings, data);
    addHistory(response as ILocationCallback);

    switch (response.type) {
      case 'APPROACHING':
        await Notifications.presentLocalNotificationAsync({
          body: '接近放送開始',
          title: 'お知らせ'
        });
        break;
      case 'LEAVED':
        await Notifications.presentLocalNotificationAsync({
          body: 'Podから離れました',
          title: 'お知らせ'
        });
        break;
      default:
        break;
    }
  }

  public render() {
    return (
      <View style={styles.wrapper}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  histories: state.history.histories,
  settings: state.settings.settings
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  addHistory: (history: ILocationCallback) =>
    dispatch(historyActions.addHistory({ history })),
  fetchSettings: () => dispatch(fetchSettingsAsync())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
