import React from 'react';
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
      <header
        className="header-content"
        data-testid="header-component"
      >
        <div className="user-name-content">
          <div className="icon-user-name">
            user
          </div>
          <p className="text-user-name" data-testid="header-user-name">
            {userName === '' ? <h4>Carregando...</h4> : userName }
          </p>
        </div>
      </header>
    );
  }
}

export default Header;
