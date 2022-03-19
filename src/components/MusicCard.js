import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
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
  const { state } = this;
  if (state[music.trackId]) {
    this.setState({ loading: true });
    await removeSong(music);
    this.setState({ loading: false });
    this.setState((prev) => ({ [music.trackId]: !prev[music.trackId] }));
  } else {
    this.setState({ loading: true });
    await addSong(music);
    this.setState({ loading: false });
    this.setState((prev) => ({ [music.trackId]: !prev[music.trackId] }));
  }
}

render() {
  const { loading } = this.state;
  const { state } = this;
  const { data } = this.props;
  const arrayMusics = [...data];
  arrayMusics.shift();
  return (
    <div>
      <div>{ loading && <Loading /> }</div>
      <section>
        <ul>
          { arrayMusics.map((music) => (
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

MusicCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  })),
  favorites: PropTypes.arrayOf(PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  })),
}.isRequired;

export default MusicCard;
