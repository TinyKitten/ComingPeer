import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ILocationCallback } from '../models/LocationCallback';

interface IProps {
  history: ILocationCallback;
}

const HistoryItem = (props: IProps) => {
  const { history } = props;

  let textColor = 'black';
  switch (history.type) {
    case 'LEAVED':
      textColor = 'blue';
      break;
    case 'APPROACHING':
      textColor = 'red';
      break;
    default:
      break;
  }

  const viewStyle = StyleSheet.create({
    container: {
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 12,
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 12
    },
    typeText: {
      color: textColor,
      fontWeight: 'bold'
    }
  });

  return (
    <View style={viewStyle.container}>
      <Text style={viewStyle.typeText}>{history.type}</Text>
      <Text>Latitude: {String(history.latitude)}</Text>
      <Text>Longitude: {String(history.longitude)}</Text>
    </View>
  );
};

export default HistoryItem;
