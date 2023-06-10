'use client';

import { PostGrid } from '@/components/layout/grid-layout';
import PostCard from '@/components/post-grid/post-card';
import React from 'react';
import useGetPosts from '@/components/post-grid/hooks/useGetPosts';

export const dynamic = 'force-dynamic';

export default function MainPage() {
  const { data, loading } = useGetPosts();

  return (
    <PostGrid className="mt-[1rem]">
      <PostCard posts={data?.recentPosts || []} loading={!data || loading} />
    </PostGrid>
  );
}
