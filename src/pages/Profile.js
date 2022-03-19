import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.getProfile();
  }

getProfile = async () => {
  this.setState({ loading: true });
  const user = await getUser();
  this.setState({ user });
  this.setState({ loading: false });
}

render() {
  const { loading, user } = this.state;
  return (
    <main data-testid="page-profile">
      { loading && <Loading /> }
      {
        <div>
          <Header />
          <div>
            <img
              src={ user.image }
              alt="foto-do-perfil"
              data-testid="profile-image"
            />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
          <p>{ user.name }</p>
          <p>{ user.email }</p>
          <p>{ user.description }</p>
        </div>
      }
    </main>
  );
}
}

export default Profile;
