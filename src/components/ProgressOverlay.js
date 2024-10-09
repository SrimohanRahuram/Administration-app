import React, {Component} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

export default class ProgressOverlay extends Component {
  render() {
    return (
      <Spinner
        visible={this.props.visible ?? false}
        textContent={this.props.message ?? ''}
        animation="fade"
        color={this.props.color ?? 'white'}
        overlayColor={this.props.overlayColor}
        size="large"
        textStyle={this.props.textStyle ?? {color: 'white'}}
        cancelable={this.props.cancelable ?? false}
      />
    );
  }
}
