import { Location } from 'expo';
import React, { Component, Dispatch } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import { saveSettingsAsync } from '../actions/settings';
import { sendLocation } from '../api';
import { ILocationSendPayload } from '../models/LocationSendPayload';
import { ISettings } from '../models/Settings';
import { IAppState } from '../reducers';

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 24,
    width: 200
  },
  wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});

interface IProps {
  settings: ISettings | null;
  saveSettings: (settings: ISettings) => void;
}

interface IState {
  peerId: string;
  peerToken: string;
}

class SettingsScreen extends Component<IProps, IState> {
  public static navigationOptions = {
    title: 'Settings'
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      peerId: '',
      peerToken: ''
    };

    this.onPeerIdChange = this.onPeerIdChange.bind(this);
    this.onPeerTokenChange = this.onPeerTokenChange.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.testSettings = this.testSettings.bind(this);
  }

  public render() {
    return (
      <View style={styles.wrapper}>
        <Text>Peer ID:</Text>
        <TextInput
          returnKeyType="done"
          keyboardType="number-pad"
          onChangeText={this.onPeerIdChange}
          style={styles.textInput}
          placeholder={this.props.settings ? this.props.settings.peerId : ''}
        />
        <Text>Peer Token:</Text>
        <TextInput
          maxLength={6}
          returnKeyType="done"
          onChangeText={this.onPeerTokenChange}
          style={styles.textInput}
          placeholder={this.props.settings ? this.props.settings.peerToken : ''}
        />
        <Button onPress={this.saveSettings} title="Apply" />
        <Button onPress={this.testSettings} title="Test" />
      </View>
    );
  }

  private onPeerIdChange(peerId: string) {
    this.setState({
      peerId
    });
  }

  private onPeerTokenChange(peerToken: string) {
    this.setState({
      peerToken
    });
  }

  private saveSettings() {
    if (!this.state.peerId || !this.state.peerToken) {
      Alert.alert('エラー', 'ピア情報が不十分です');
      return;
    }
    const newSettings: ISettings = {
      peerId: this.state.peerId,
      peerToken: this.state.peerToken
    };
    this.props.saveSettings(newSettings);
  }

  private async testSettings() {
    if (!this.state.peerId || !this.state.peerToken) {
      Alert.alert('エラー', 'ピア情報が不十分です');
      return;
    }
    const candidateSettings: ISettings = {
      peerId: this.state.peerId,
      peerToken: this.state.peerToken
    };
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced
    });
    const token = candidateSettings.peerToken;
    if (!token) {
      Alert.alert('エラー', 'ピア情報が不十分です');
      return;
    }
    const payload: ILocationSendPayload = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      token
    };
    sendLocation(candidateSettings, payload)
      .then(() => {
        Alert.alert('テスト結果', `トークンは正常です。`);
      })
      .catch(err => {
        Alert.alert('エラー', `エラーコード: ${err.status}`);
      });
  }
}

const mapStateToProps = (state: IAppState) => ({
  settings: state.settings.settings
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  saveSettings: (settings: ISettings) => dispatch(saveSettingsAsync(settings))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
