import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <main data-testid="page-search" className="content">
        <Header />
        <p>search</p>
      </main>
    );
  }
}

export default Search;
