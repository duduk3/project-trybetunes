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

  handleCheck = async (music) => {
    this.setState({ loading: true });
    await addSong(music);
    this.setState({ loading: false });
  }

  checkTest = (music) => {
    const { favorites } = this.props;
    const checked = favorites.filter((e) => e.trackId === music.trackId);
    if (checked) return true;
  }

  render() {
    const { loading } = this.state;
    const { data, favorites } = this.props;
    const arrayMusics = [...data];
    arrayMusics.shift();
    return (
      <div>
        <div>{ loading && <Loading /> }</div>
        <section>
          <ul>
            { arrayMusics.map((music) => {
              const checkTest = favorites.find((el) => {
                let checkedFav;
                if (el.trackId === music.trackId) {
                  checkedFav = true;
                } else { checkedFav = undefined; }
                return checkedFav;
              });
              return (
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
                      onChange={ () => this.handleCheck(music) }
                      value={ `${music.trackId}` }
                      data-testid={ `checkbox-music-${music.trackId}` }
                      checked={ checkTest }
                    />
                    Favorita
                  </label>
                </li>
              );
            })}
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
  })).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  })).isRequired,
};

export default MusicCard;
