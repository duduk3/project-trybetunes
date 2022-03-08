import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

let artistName = '';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textSearch: '',
      loading: false,
      loaded: false,
      data: [],
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  getAlbum = async () => {
    const { textSearch } = this.state;
    artistName = textSearch;
    this.setState({ loading: true, loaded: false });
    const albuns = await Promise.resolve(searchAlbumsAPI(textSearch));
    this.setState({
      loading: false,
      loaded: true,
      textSearch: '',
      data: [...albuns],
    });
  }

  render() {
    const { textSearch, loading, loaded, data } = this.state;
    const albuns = data;
    const zero = 0;
    return (
      <main data-testid="page-search" className="content">
        <Header />
        <div>
          <input
            type="text"
            name="textSearch"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ textSearch }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ textSearch.length < 2 }
            onClick={ () => this.getAlbum() }
          >
            Pesquisar
          </button>
        </div>

        <div>
          { loaded && albuns.length > zero
            && <h1>{`Resultado de álbuns de: ${artistName}`}</h1>}

          { loaded && albuns.length === zero
            && <h2>Nenhum álbum foi encontrado</h2>}

          { loading && <Loading />}

          { loaded && (
            <div>
              {albuns.map((e) => (
                <div key={ e.collectionId } className="card">
                  <img src={ e.artworkUrl100 } alt="capa-do-album" />
                  <h4>{e.collectionName}</h4>
                  <Link
                    to={ `/album/${e.collectionId}` }
                    data-testid={ `link-to-album-${e.collectionId}` }
                  >
                    {e.artistName}
                  </Link>
                </div>
              ))}
            </div>)}
        </div>
      </main>
    );
  }
}

export default Search;
