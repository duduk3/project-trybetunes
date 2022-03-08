import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <section>
          <ul>
            { data.map((music) => (
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
