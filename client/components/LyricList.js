import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {
  _onLike(id, likes) {
    const { mutate } = this.props;
    mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    })
  }
  _renderList() {
    const { lyrics } = this.props;
    return lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className='collection-item'>
          {content}
          <div className="vote-box">
            <i
              className='material-icons'
              onClick={() => this._onLike(id, likes)}
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      )
    })
  }
  render() {
    return (
      <ul className='collection'>
        {this._renderList()}
      </ul>
    );
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);

// http://dev.apollodata.com/react/cache-updates.html