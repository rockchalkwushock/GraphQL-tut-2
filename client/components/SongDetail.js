import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import { query } from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render () {
    const { data, params } = this.props;
    const { loading, song } = data;
    const { id } = params;
    const component = loading ? (
      <h1>Loading...</h1>
    ) : (
      <div>
      <Link to='/'>Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics}/>
        <LyricCreate songId={id}/>
      </div>
    );
    return component;
  }
}

export default graphql(query, {
  options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);