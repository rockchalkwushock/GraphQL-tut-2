import gql from 'graphql-tag';

// This is defining the query.
// it is not executing the query.
export const query = gql`
  {
    songs {
      id
      title
    }
  }
`;