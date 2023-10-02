import React from 'react';

import TrackCreateDetails from 'ui/tx/TrackCreateDetails';
import UserCreateDetails from 'ui/tx/UserCreateDetails';

interface Props {
  hex: string;
}

function hexToString(hex: string) {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    const v = parseInt(hex.substr(i, 2), 16);
    if (v) {
      str += String.fromCharCode(v);
    }
  }
  return str;
}

const AudiusDetails = ({ hex }: Props) => {
  const decoded = hexToString(hex);
  if (decoded.includes('User\x06Create\x02')) {
    return <UserCreateDetails data={ decoded }/>;
  }
  if (decoded.includes('Track\x06Create\x05')) {
    return <TrackCreateDetails data={ decoded }/>;
  }

  return null;
};

export default React.memo(AudiusDetails);
