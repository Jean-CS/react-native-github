import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';

import { Loading } from '../../components';

export default class Repo extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repo').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    repo: {},
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const repo = navigation.getParam('repo');

    this.setState({ repo });
  }

  render() {
    const { repo } = this.state;

    return (
      <WebView
        source={{ uri: repo.html_url }}
        style={{ flex: 1 }}
        startInLoadingState
        renderLoading={() => <Loading />}
      />
    );
  }
}
