import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      musica: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { musica } = this.state;
    return (
      <main data-testid="page-search" className="content">
        <Header />
        <div>
          <input
            type="text"
            name="musica"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ musica.length < 2 }
          >
            Pesquisar
          </button>
        </div>
      </main>
    );
  }
}

export default Search;
