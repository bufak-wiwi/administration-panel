import React from 'react';
import { Row } from 'reactstrap'
import Emptylayout from './Layout/EmptyLayout'
const missingPermissions = require('../assets/img/octocat/missingPermissions.png');

const MissingPermissions = ( ) => {
  return (
    <Emptylayout>
      <Row style={{justifyContent: 'center'}}>
       <img src={missingPermissions} alt="OCTOCAT!"/>
      </Row>
    </Emptylayout>
  );
};

export default MissingPermissions;
