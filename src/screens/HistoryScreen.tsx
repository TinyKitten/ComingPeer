import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';

import HistoryItem from '../components/HistoryItem';
import { ILocationCallback } from '../models/LocationCallback';
import { ISettings } from '../models/Settings';
import { IAppState } from '../reducers';

const MAX_LISTED_HISTORIES = 100;

interface IProps {
  settings: ISettings | null;
  histories: ILocationCallback[];
  onClearClick: () => void;
  navigation: NavigationScreenProp<any>;
}

interface IRenderItemProps {
  item: ILocationCallback;
}

const styles = StyleSheet.create({
  noSettings: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});

class HistoryScreen extends React.Component<IProps> {
  public static navigationOptions = () => ({
    title: 'History'
  });

  public render() {
    const { histories, settings } = this.props;
    const slicedHistories = histories.slice(0, MAX_LISTED_HISTORIES);

    const keyExtractor = (item: ILocationCallback) => String(item.created_at);
    const renderItem = ({ item }: IRenderItemProps) => (
      <HistoryItem history={item} />
    );

    if (!settings) {
      return (
        <View style={styles.noSettings}>
          <Text style={{ fontWeight: 'bold' }}>ピア情報を設定してください</Text>
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={slicedHistories}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  histories: state.history.histories,
  settings: state.settings.settings
});

export default connect(mapStateToProps)(HistoryScreen);
