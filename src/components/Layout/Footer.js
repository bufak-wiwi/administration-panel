import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          2018 BuFaK WiSo, source on <SourceLink>Github</SourceLink> - <a href="/datenschutz" target="_blank">Datenschutzerklärung</a>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
