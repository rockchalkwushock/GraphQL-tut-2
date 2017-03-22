import gql from 'graphql-tag';

// This is defining the query.
// it is not executing the query.
export const query = gql`
  query fetchSong($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;