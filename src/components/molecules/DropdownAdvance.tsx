// Libraries
import React, { ReactNode, useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';

// Component

// Style

// Types

interface DropdownAdvanceProps {
  menuTrigger: ReactNode;
  menus: any;
  onChangeValue: Function;
}

const DropdownAdvance: React.FC<DropdownAdvanceProps> = props => {
  const { menuTrigger, onChangeValue, menus } = props;
  const [activeMenu, setActiveMenu] = useState('sidebar-menu-main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const [value, setValue] = useState('');
  // hanle
  const changeMenu = (menu: any) => {
    console.log('Inut', menu.key);
    console.log(Object.prototype.hasOwnProperty.call(menu, 'parent'));
    if (Object.prototype.hasOwnProperty.call(menu, 'parent')) setActiveMenu(menu.parent);
    else if (!!menu.key && !!menu.children) setActiveMenu(menu.key);
  };

  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{menuTrigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={'shadow-md  bg-background cursor-pointer w-[250px] p-2 rounded-[20px]  '}
      >
        <div
          className={` ${activeMenu !== 'sidebar-menu-main' ? 'hidden' : 'block'}`}
          id={'sidebar-menu-main'}
          ref={dropdownRef}
        >
          {menus.map(link => {
            return (
              <div
                key={link.label}
                className={`left-sidebar-link group`}
                onClick={() => changeMenu(link)}
              >
                <div className='flex gap-4 items-center p-4 text-muted-foreground'>
                  {!!link.icon && <link.icon />}
                  {link.label}
                </div>
              </div>
            );
          })}
        </div>
        {/*SubMenu*/}
        {menus.map(
          (menu, index) =>
            !!menu.children && (
              <div
                key={index}
                className={`${activeMenu !== menu.key && 'hidden'}`}
                id={'sidebar-menu-sub'}
              >
                {menu.children.map(submenu => {
                  return (
                    <div key={submenu.key} className={`left-sidebar-link group`}>
                      {submenu.hasOwnProperty('children') ? (
                        <div
                          className='flex gap-4 items-center p-4 text-muted-foreground'
                          onClick={() => onChangeValue(submenu.key)}
                        >
                          {!!submenu.icon && <submenu.icon />}
                          {submenu.label}
                        </div>
                      ) : (
                        <div
                          className='flex gap-4 items-center p-4 font-bold text-muted-foreground'
                          onClick={() => changeMenu(submenu)}
                        >
                          {!!submenu.icon && <submenu.icon />}
                          {submenu.label}
                          <DropdownMenuSeparator />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAdvance;

interface DropDownSubProps {
  data: any;
}

const DropdownSub: React.FC<DropDownSubProps> = props => {
  const { data } = props;
  return <div className={'flex hidden'}></div>;
};