import clsx from 'clsx';
import React from 'react';
import { NavbarItem, NavbarItemProps } from './NavbarItem';

interface NavbarProps {
  primaryItems: NavbarItemProps[];
  secondaryItems: NavbarItemProps[];
  className?: string;
  isDisabled?: boolean;
}

const Navbar = ({ primaryItems, secondaryItems, className, isDisabled }: NavbarProps) => (
  <nav className={clsx('border', className)}>
    <ul>
      {primaryItems.map(itemProps => (
        <li key={itemProps.text}>
          <NavbarItem {...itemProps} />
        </li>
      ))}
    </ul>

    <div className="border"></div>
    <ul>
      {secondaryItems.map(itemProps => (
        <li key={itemProps.text}>
          <NavbarItem {...itemProps} />
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
