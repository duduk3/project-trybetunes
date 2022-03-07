import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  getName = async () => {
    const response = await Promise.resolve(getUser());
    const result = response.name;
    console.log(result);
    return 'waiting';
  }

  render() {
    return (
      <header
        className="header-content"
        data-testid="header-component"
      >
        <div>
          <p className="header" data-testid="header-user-name">{this.getName()}</p>
        </div>
      </header>
    );
  }
}

export default Header;
