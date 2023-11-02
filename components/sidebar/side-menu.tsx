import * as React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import useLogout from '../auth/hooks/use-logout';
import { RootState } from '../../store/rootReducer';
import { SideMenuItem } from './side-menu-item';

type Dispatch<A> = (value: A) => void;

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export type SideMenuProps = {
  SetBookIsClose: Dispatch<React.SetStateAction<boolean>>;
  BookIsClose: boolean;
};

export function SideMenu({ SetBookIsClose, BookIsClose }: SideMenuProps) {
  const { auth } = useSelector((state: RootState) => state.auth) as any;
  const { handleSubmitLogout } = useLogout();

  const itemIds = [
    {
      id: 1,
      text: 'Home',
      link: '/',
    },
    {
      id: 2,
      text: 'Search',
      link: '/serach',
    },
  ];

  const MobileitemIds = [
    {
      id: 1,
      text: 'Home',
      link: '/',
    },
    {
      id: 2,
      text: 'Write',
      onClick: () => SetBookIsClose(!BookIsClose),
    },
    {
      id: 3,
      text: 'Search',
      link: '/search',
    },
    {
      id: 4,
      text: 'Logout',
      link: '/',
      onClick: handleSubmitLogout,
    },
  ];
  //keep
  return (
    <motion.ul variants={variants} className="absolute top-24 z-[600] px-4">
      {auth?.username
        ? MobileitemIds.map(({ id, text, link, onClick }) => (
            <SideMenuItem id={id} text={text} link={link} onClick={onClick} key={id} />
          ))
        : itemIds.map(({ id, text, link }) => (
            <SideMenuItem id={id} text={text} link={link} key={id} />
          ))}
    </motion.ul>
  );
}