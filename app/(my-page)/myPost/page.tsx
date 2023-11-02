'use client';

import React from 'react';
import { PostGrid } from '@/components/layout/grid-layout';
import HomeTitle from '@/components/home/home-title';
import useGetPostsBy from '@/components/post/hooks/use-get-posts-name';
import PostCard from '@/components/post/post-card';

export const dynamic = 'force-dynamic';

export default function MainPage() {
  const { data, loading } = useGetPostsBy({ isTemp: false });

  return (
    <>
      <HomeTitle title="내가 쓴 글" />
      <PostGrid className="mt-[1rem]">
        <PostCard posts={data?.posts || []} loading={!data || loading} />
      </PostGrid>
    </>
  );
}