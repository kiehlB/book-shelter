import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AiFillEdit, AiFillLike, AiFillNotification } from 'react-icons/ai';
import { TfiWrite } from 'react-icons/tfi';
import { CiRead } from 'react-icons/ci';
import { PageLayout } from '@/components/layout/page-layout';
import { PageGrid } from '@/components/layout/grid-layout';
import { AppLayout, First, MainNav, Second } from '@/components/layout/app-layout';
import Navbar from '@/components/navbar';
import HomeTitle from '@/components/home/home-title';
import SettingCard from '@/components/setting/Setting-info-card';
import { RiBookOpenLine } from 'react-icons/ri';

export default function Profile({ children }) {
  return (
    <>
      <PageLayout>
        <PageGrid as="div" className="pb-[2rem] pt-[2rem]">
          <MainNav className="col-span-2 mmd:hidden">
            <div className="sticky top-24">
              <Navbar
                primaryItems={[
                  {
                    icon: <AiFillEdit />,
                    text: '내 정보 수정',
                    to: '/profile',
                  },
                  {
                    icon: <TfiWrite />,
                    text: '임시 글',
                    to: '/temporaryPost',
                    sub: ['/search', '/search/[query]', '/trending'],
                  },
                  {
                    icon: <RiBookOpenLine />,
                    text: '내가 쓴 글',
                    to: '/myPost',
                    sub: ['/search', '/search/[query]', '/trending'],
                  },
                  {
                    icon: <CiRead />,
                    text: '내가 읽은 목록',
                    to: '/readPost',
                    sub: ['/search', '/search/[query]', '/trending'],
                  },
                  {
                    icon: <AiFillLike />,
                    text: '좋아요 글',
                    to: '/likedPost',
                  },
                ]}
              />
            </div>
          </MainNav>

          <AppLayout
            className="col-span-8 mmd:col-span-12"
            first={
              <First>
                <HomeTitle title="내 정보 설정" />
              </First>
            }
            second={<Second>{children}</Second>}
          />
        </PageGrid>
      </PageLayout>
    </>
  );
}
