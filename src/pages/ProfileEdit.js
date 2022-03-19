import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      buttonValidate: true,
      redirect: false,
      user: {
        name: '',
        email: '',
        description: '',
        image: '',
      },
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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState((prev) => ({ user: { ...prev.user, [name]: value } }));
    this.validate(name, value);
  }

  saveNewUser = async (user) => {
    this.setState({ loading: true });
    await updateUser(user);
    this.setState({ loading: false, redirect: true });
  }

  validate = (stringName, stringValue) => {
    const { user: { name, email, description, image } } = this.state;
    //* Regex foi uma adaptação da fonte: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const emailRegex = /\S+@\S+\.com/;
    let valid = emailRegex.test(email);
    if (stringName === 'email') {
      const currentEmail = stringValue;
      valid = emailRegex.test(currentEmail);
    }
    if (valid && name !== '' && description !== '' && image !== '') {
      this.setState({ buttonValidate: false });
    } else {
      this.setState({ buttonValidate: true });
    }
  }

  render() {
    const { user, loading, buttonValidate, redirect } = this.state;
    return (
      <main data-testid="page-profile-edit">
        { redirect && <Redirect to="/profile" /> }
        {loading && <Loading />}
        {
          <div>
            <Header />
            <input
              name="name"
              type="text"
              data-testid="edit-input-name"
              onChange={ this.handleChange }
              value={ user.name }
            />
            <input
              name="email"
              type="text"
              data-testid="edit-input-email"
              onChange={ this.handleChange }
              value={ user.email }
            />
            <input
              name="description"
              type="text"
              data-testid="edit-input-description"
              onChange={ this.handleChange }
              value={ user.description }
            />
            <input
              name="image"
              type="text"
              data-testid="edit-input-image"
              onChange={ this.handleChange }
              value={ user.image }
            />
            <button
              type="button"
              disabled={ buttonValidate }
              data-testid="edit-button-save"
              onClick={ () => this.saveNewUser(user) }
            >
              Salvar
            </button>
          </div>
        }
      </main>
    );
  }
}

export default ProfileEdit;
