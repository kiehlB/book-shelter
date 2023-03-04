import { useQuery } from '@apollo/client';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import useScrollPagination from '../../../hooks/useScrollPagination';
import { GET_Posts } from '../../../lib/graphql/posts';
import { RootState } from '../../../store/rootReducer';

export default function () {
  const { auth } = useSelector((state: RootState) => state.auth);

  const { data, loading, fetchMore } = useQuery(GET_Posts, {
    variables: {
      limit: 24,
      username: auth?.username,
    },

    notifyOnNetworkStatusChange: true,
  });
  const [isFinished, setIsFinished] = useState(false);

  const onLoadMore = useCallback(
    (cursor: string) => {
      fetchMore({
        variables: {
          cursor,
          limit: 24,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (fetchMoreResult.posts.length === 0) {
            setIsFinished(true);
          }
          return {
            posts: [...prev.posts, ...fetchMoreResult.posts],
          };
        },
      });
    },
    [fetchMore],
  );

  const cursor = data?.posts[data?.posts.length - 1]?.id;

  useScrollPagination({
    cursor,
    onLoadMore,
  });

  return { data, loading, isFinished };
}