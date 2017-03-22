import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    const { mutate, songId } = this.props;
    const { content } = this.state;
    e.preventDefault();
    mutate({ variables: { content, songId }})
      .then(() => this.setState({ content: '' }));
  }
  render() {
    const { content } = this.state;
    return (
      <form onSubmit={this._onSubmit}>
        <label>Add a Lyric</label>
        <input
          value={content}
          onChange={e => this.setState({ content: e.target.value })}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);