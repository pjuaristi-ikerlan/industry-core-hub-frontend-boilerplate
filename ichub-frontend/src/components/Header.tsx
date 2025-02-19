import React from 'react';
import { MainNavigation, Button } from '@catena-x/portal-shared-components';

const Header = () => {
  return (
    <MainNavigation
      items={[
        {
          href: '/',
          title: 'Link 1',
        },
        {
          href: '/',
          title: 'Link 2',
        },
        {
          href: '/',
          title: 'Link 3',
        },
        {
          href: '/',
          title: 'Link 4',
        },
      ]}
    >
      <a href="/">
        <img
          src="https://eclipse-tractusx.github.io/portal-shared-components/assets/cx-logo-text-DoATHErk.svg"
          alt="Logo"
          style={{
            display: 'inline-block',
            height: '40px',
            width: '170px',
          }}
        />
      </a>
      <div>
        <Button color="secondary" size="small" variant="contained"
          sx={{
            backgroundColor: 'white',
            marginRight: '16px',
          }}
        >
          Help
        </Button>
      </div>
    </MainNavigation>
  );
};

export default Header;
