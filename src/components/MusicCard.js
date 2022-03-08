import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  handleCheck = async () => {
    const { data } = this.props;
    this.setState({ loading: true });
    const result = await addSong(data);
    this.setState({ loading: false });
    return result;
  }

  render() {
    const { loading } = this.state;
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
                  .
                </audio>
                <label htmlFor={ `${music.trackId}` }>
                  <input
                    name={ `${music.trackId}` }
                    id={ `${music.trackId}` }
                    type="checkbox"
                    onChange={ this.handleCheck }
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
    trackId: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  })).isRequired,
};

export default MusicCard;
