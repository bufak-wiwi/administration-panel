import React from 'react';
import Typography from './Typography'
import bn from 'utils/bemnames';
const bem = bn.create('page');
const MissingPermissions = ( ) => {
  return (
    <div className="cr-page-spinner">
            <Typography type="h3" className={bem.e('title')}>
             Keine Berechtigungen
          </Typography>
    </div>
  );
};

export default MissingPermissions;
