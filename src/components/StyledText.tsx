import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

interface IProps {
  style: StyleProp<TextStyle>;
}

export class MonoText extends React.Component<IProps> {
  public render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: 'space-mono' }]}
      />
    );
  }
}
