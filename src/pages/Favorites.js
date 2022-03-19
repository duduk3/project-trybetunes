import React from 'react';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      fav: [],
    };
  }

  componentDidMount() {
    this.changeFavorites();
  }

changeFavorites = async () => {
  this.setState({ loading: true });
  const favor = await getFavoriteSongs();
  this.setState({ loading: false });
  this.setState({ fav: [...favor] });
  favor.forEach((favorite) => {
    this.setState({ [favorite.trackId]: true });
  });
}

handleCheck = async (music) => {
  this.setState({ loading: true });
  await removeSong(music);
  const favor = await getFavoriteSongs();
  this.setState((prev) => ({ [music.trackId]: !prev[music.trackId] }));
  this.setState({ loading: false, fav: [...favor] });
}

render() {
  const { loading, fav } = this.state;
  const { state } = this;

  return (
    <div data-testid="page-favorites">
      <Header />
      <div>{ loading && <Loading /> }</div>
      <section>
        <ul>
          { fav && fav.map((music) => (
            <li key={ music.trackId }>
              <p>{ music.trackName }</p>
              <audio
                data-testid="audio-component"
                src={ music.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>
              <label htmlFor={ music.trackId }>
                <input
                  name={ music.trackId }
                  id={ music.trackId }
                  type="checkbox"
                  onChange={ () => this.handleCheck(music) }
                  checked={ state[music.trackId] }
                  data-testid={ `checkbox-music-${music.trackId}` }
                />
                Favorita
              </label>
            </li>
          ))}
        </ul>
      </section>
    </div>);
}
}

export default Favorites;
