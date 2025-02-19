import React from 'react';
import { Menu } from '@catena-x/portal-shared-components';

const Sidebar = () => {
  return (
    <Menu
      items={[
        {
          children: [
            {
              href: '/',
              title: 'Submenu Item 1'
            },
            {
              href: '/',
              title: 'Submenu Item 2'
            },
            {
              disable: true,
              hint: 'coming soon',
              href: '/',
              title: 'Submenu Item 3'
            }
          ],
          href: '/',
          title: 'Menu Item 1'
        },
        {
          href: '/',
          title: 'Menu Item 2'
        },
        {
          href: '/',
          title: 'Menu Item 3'
        }
      ]}
    />
  )
}

export default Sidebar