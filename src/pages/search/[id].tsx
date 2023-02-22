import { GetServerSideProps } from 'next';
import { NextSeo, SiteLinksSearchBoxJsonLd } from 'next-seo';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { RiBookOpenLine, RiDashboard3Line, RiFileChartFill } from 'react-icons/ri';
import HomeTab from '../../components/home/HomeTab';
import { AppLayout, First, MainNav, Second } from '../../components/layout/AppLayout';
import { PageGrid, PostGrid } from '../../components/layout/GridLayout';
import { PageLayout } from '../../components/layout/PageLayout';
import Navbar from '../../components/navbar';
import useGetSearchPosts from '../../components/post/hooks/useGetSearchPosts';
import PostCard from '../../components/post/PostCard';
import { getNextSeo } from '../../lib/nextSeo';
import { motion, useReducedMotion } from 'framer-motion';
import { BackLink } from '../../components/common/ArrowButton';

export default function Search({ id }) {
  const { data, loading } = useGetSearchPosts(id);

  return (
    <motion.div>
      <NextSeo {...getNextSeo({ title: 'Search page', description: '검색 페이지' })} />
      <SiteLinksSearchBoxJsonLd
        url="https://www.bookreview.pro/search?q"
        potentialActions={[
          {
            target: 'https://www.bookreview.pro/search?q',
            queryInput: 'search_term_string',
          },
        ]}
      />

      <PageLayout>
        <PageGrid as="div" className="pt-[2.25rem]">
          <MainNav className="col-span-2 mmd:hidden">
            <Navbar
              primaryItems={[
                {
                  icon: <RiBookOpenLine />,
                  text: '포스트',
                  to: '/',
                  sub: '/search',
                },
                {
                  icon: <RiDashboard3Line />,
                  text: '게시판',
                  to: '/post',
                },
              ]}
              secondaryItems={[
                {
                  icon: <RiFileChartFill />,
                  text: 'Trending tags',
                  to: '/Trending tags',
                },
              ]}></Navbar>
          </MainNav>

          <AppLayout
            className="col-span-8 mmd:col-span-12"
            first={
              <First>
                <div className="flex justify-between items-center">
                  <BackLink href="/">
                    <div className="w-[240px] text-[#334155] text-base flex items-center justify-between font-semibold pl-3 dark:text-[#D3D3D3]">
                      메인으로
                    </div>
                  </BackLink>
                </div>
              </First>
            }
            second={
              <Second>
                <PostGrid className="mt-[1rem]">
                  <PostCard posts={data?.searchPosts || []} loading={!data || loading} />
                </PostGrid>
              </Second>
            }
          />
        </PageGrid>
      </PageLayout>
    </motion.div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;

  return { props: { id } };
};