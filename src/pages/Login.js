import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      loading: false,
      storaged: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ name: target.value });
  }

  isSaved = () => {
    const { name } = this.state;
    const objSaved = localStorage;
    if (JSON.parse(objSaved.user).name === name) {
      this.setState({ storaged: true, loading: false });
    }
  }

  handleClick = async () => {
    this.setState({ loading: true });
    await createUser(this.state);
    this.isSaved();
  }

  render() {
    const { name, loading, storaged } = this.state;
    const num3 = 3;
    return (
      <main data-testid="page-login">
        {loading && <Loading />}
        {storaged && <Redirect to="search" />}
        <form>
          <input
            className="input-login loading"
            data-testid="login-name-input"
            placeholder="Nome"
            onChange={ this.handleChange }
          />
          <button
            className="btn-login loading"
            type="button"
            data-testid="login-submit-button"
            onClick={ this.handleClick }
            disabled={ name.length < num3 }
          >
            Entrar
          </button>

        </form>
      </main>
    );
  }
}

export default Login;
