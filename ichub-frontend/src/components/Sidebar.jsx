import React from 'react';
import { Menu } from '@catena-x/portal-shared-components';

const Sidebar = () => {
  return (
    <Menu
      items={[
        {
          children: [
            {
              href: '/1/1',
              title: 'Submenu Item 1'
            },
            {
              href: '/1/2',
              title: 'Submenu Item 2'
            },
            {
              disable: true,
              hint: 'coming soon',
              href: '/1/3',
              title: 'Submenu Item 3'
            }
          ],
          href: '/1',
          title: 'Menu Item 1'
        },
        {
          href: '/2',
          title: 'Menu Item 2'
        },
        {
          href: '/3',
          title: 'Menu Item 3'
        }
      ]}
    />
  )
}

export default Sidebar