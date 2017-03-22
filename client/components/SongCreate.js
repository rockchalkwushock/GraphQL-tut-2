import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { hashHistory, Link } from 'react-router';
import { query } from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: ''};
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    const { mutate } = this.props;
    const { title } = this.state;
    e.preventDefault();
    mutate({
      variables: { title },
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'));
  }
  render() {
    const { title } = this.state;
    return (
      <div>
      <Link to='/'>Back</Link>
      <h3>Create a New Song</h3>
        <form onSubmit={this._onSubmit}>
          <label htmlFor="">Song Title:</label>
          <input
            onChange={e => this.setState({ title: e.target.value })}
            value={title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);