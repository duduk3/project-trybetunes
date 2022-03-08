import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loaded: false,
      data: [],
    };
  }

  componentDidMount() {
    this.musics();
  }

  musics = async () => {
    const { match: { params } } = this.props;
    this.setState({ loading: true, loaded: false });
    const results = await getMusics(params.id);
    this.setState({ loading: false, loaded: true, data: results });
  }

  render() {
    const { loading, loaded, data } = this.state;
    const arrayMusics = [...data];
    arrayMusics.shift();
    return (
      <main data-testid="page-album">
        <Header />
        <div>
          {loading && <Loading />}
          { loaded && (
            <div>
              <img src={ data[0].artworkUrl100 } alt="album" />
              <h3 data-testid="album-name">{ data[0].collectionName }</h3>
              <p data-testid="artist-name">{ data[0].artistName }</p>
            </div>)}
          <section>
            <ul>
              {loaded && arrayMusics
                .map((music) => (
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
                  </li>))}
            </ul>
          </section>
        </div>
      </main>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
