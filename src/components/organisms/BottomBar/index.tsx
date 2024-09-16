'use client';
// Libraries
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Component
// Style
// Constants
import { BOTTOM_SIDE_BAR_LINK } from '@/constraints/sidebar';

const BottomBar: React.FC = () => {
  const pathname = usePathname();
  return (
    <section className="bottom-bar">
      {BOTTOM_SIDE_BAR_LINK.map(link => {
        const isActive = pathname === link.route;

        return (
          <Link
            key={`bottom-bar-${link.label}`}
            href={link.route}
            className={`${
              isActive && 'bg-secondary rounded-[10px] '
            } flex-center flex-col gap-1 p-2 transition`}
          >
            {<link.icon className={'hover:scale-110'} width="22" height="22" />}

            <p className="tiny-medium text-light">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default BottomBar;
