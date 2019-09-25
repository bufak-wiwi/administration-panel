import React from 'react';
import { Row } from 'reactstrap'
import Emptylayout from './Layout/EmptyLayout'
const empty = require('../assets/img/octocat/empty.png');

const Empty = ( ) => {
  return (
    <Emptylayout>
      <Row style={{justifyContent: 'center'}}>
       <img src={empty} style={{maxWidth: '100%'}} alt="OCTOCAT!"/>
      </Row>
    </Emptylayout>
  );
};

export default Empty;
