import gql from 'graphql-tag';

export const createProfileMutation = gql`
  mutation CreateProfile($bio: String, $profile_name: String) {
    createProfile(bio: $bio, profile_name: $profile_name) {
      id
      bio
      profile_name
      created_at
      updated_at
    }
  }
`;

export const getProfileQuery = gql`
  query GetProfile($user_id: String) {
    getProfile(user_id: $user_id) {
      id
      bio
      profile_name
      created_at
      updated_at
    }
  }
`;
