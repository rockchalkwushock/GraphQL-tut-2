import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { query } from '../queries/fetchSongs';

/**
 * NOTES:
 * The component will render 2x.
 * The first time the query is being issued.
 * Object { data: loading: false }
 * Object { data: songs: Array[1] }
 * songs does not exist in the first render.
 *
 * refetchQueries vs this.props.data.refetch()
 * - refetchQueries: if not fetching from same component
 * - this.props.data.refetch(): if have access to this.props.data in component
 * and the data is being changed in the same component.
 * ultimately this is a preference thing though.
 */

class SongList extends Component {
  _onSongDelete(id) {
    const { mutate } = this.props;
    mutate({ variables: { id } }).then(() =>
    this.props.data.refetch());
  }
  _renderSongs() {
    const { songs } = this.props.data;
    return songs.map(({ id, title }) => {
      return (
        <li key={id} className='collection-item'>
          <Link to={`songs/${id}`}>
            {title}
          </Link>
          <i
            className='material-icons'
            onClick={() => this._onSongDelete(id)}
          >
            delete
          </i>
        </li>
      )
    })
  }
  render() {
    const { loading } = this.props.data;
    const component = loading ? (
      <h1>Loading...</h1>
    ) : (
      <div>
        <ul className='collection'>
          {this._renderSongs()}
        </ul>
        <Link
          to='/songs/new'
          className='btn-floating btn-large red right'
        >
         <i className='material-icons'>add</i>
        </Link>
      </div>

    );
    return component;
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(SongList)
);