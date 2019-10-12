import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import api from '../../services/api';
import { Header, Avatar, Name, Bio, Stars, Starred, OwnerAvatar, Info, Title, Author } from './styles';
import { Container, Loading } from '../../components';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: true,
    login: '',
    page: 1,
    refreshing: false,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const res = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: res.data, login: user.login, loading: false });
  }

  loadMore = async () => {
    const { stars, login, page } = this.state;

    const res = await api.get(`/users/${login}/starred?page=${page + 1}`);

    this.setState({ stars: [...stars, ...res.data], page: page + 1 });
  };

  refreshList = () => {
    const { stars } = this.state;

    this.setState({ refreshing: true });

    this.setState({ stars: stars.splice(0, 30), page: 1, refreshing: false });
  };

  handleNavigate = repo => {
    const { navigation } = this.props;

    navigation.navigate('Repo', { repo });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loading />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.handleNavigate(item)}>
                <Starred>
                  <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              </TouchableOpacity>
            )}
          />
        )}
      </Container>
    );
  }
}
