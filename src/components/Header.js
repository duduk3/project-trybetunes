import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    const response = await Promise.resolve(getUser());
    const result = response.name;
    this.setState({ userName: result });
  };

  render() {
    const { userName } = this.state;
    return (
      <main className="header-content colunm">
        <header
          className="header-content"
          data-testid="header-component"
        >
          <div className="user-name-content">
            <div className="icon-user-name">
              user
            </div>
            <div className="text-user-name" data-testid="header-user-name">
              {userName === '' ? <h4>Carregando...</h4> : userName }
            </div>
          </div>
        </header>
        <section className="links-content">
          <div className="link-blocks">
            <Link
              to="/search"
              className="link-text"
              data-testid="link-to-search"
            >
              Link
            </Link>
          </div>

          <div className="link-blocks">
            <Link
              to="/favorites"
              className="link-text"
              data-testid="link-to-favorites"
            >
              Favoritos
            </Link>
          </div>

          <div className="link-blocks">
            <Link
              to="/profile"
              className="link-text"
              data-testid="link-to-profile"
            >
              Profile

            </Link>
          </div>
        </section>
      </main>
    );
  }
}

export default Header;
