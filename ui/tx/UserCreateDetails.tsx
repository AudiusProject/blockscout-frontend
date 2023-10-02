import {
  Grid,
  Textarea,
  Image,
} from '@chakra-ui/react';
import React from 'react';

import CopyToClipboard from 'ui/shared/CopyToClipboard';

interface UserData {
  cid: string;
  data: {
    profile_picture_sizes: string | null;
    cover_photo_sizes: string | null;
    name: string | null;
    handle: string;
    // ... other fields as needed
  };
}

interface Props {
  data: string;
}

const ProfilePicture = ({ userData }: { userData: UserData }) => {
  if (userData?.data?.profile_picture_sizes) {
    const imageUrl = `https://creatornode12.staging.audius.co/content/${ userData.data.profile_picture_sizes }/150x150.jpg`;
    return <Image src={ imageUrl } alt="Profile Picture"/>;
  }

  return (
    <div>
    </div>
  );
};

const CoverPhoto = ({ userData }: { userData: UserData }) => {
  if (userData?.data?.cover_photo_sizes) {
    const imageUrl = `https://creatornode12.staging.audius.co/content/${ userData.data.cover_photo_sizes }/640x.jpg`;
    return <Image src={ imageUrl } alt="Cover Photo"/>;
  }

  return (
    <div>
    </div>
  );
};

const UserCreateDetails = ({ data }: Props) => {
  const startIndex = data.indexOf('{"cid"');
  const endIndex = data.lastIndexOf('}}') + 2;
  if (startIndex === -1 || endIndex === -1) {
    return; // malformed or not found
  }

  const extractedData = data.substring(startIndex, endIndex);
  const userData: UserData = JSON.parse(extractedData);

  return (
    <Grid width="100%"columnGap={ 8 } rowGap={{ base: 3, lg: 3 }} templateColumns={{ base: 'minmax(0, 1fr)', lg: 'auto minmax(0, 1fr)' }}>
      <span>Entity Manager Action</span>
      <span>User Create</span>
      <span>Handle</span>
      <span>@{ userData?.data?.handle }</span>
      <span>Name</span>
      <span>{ userData?.data?.name }</span>
      <span>Profile Picture</span>
      <ProfilePicture userData={ userData }/>
      <span>Cover Photo</span>
      <CoverPhoto userData={ userData }/>
      <span>Data</span>
      <div>
        <Textarea
          value={ extractedData }
          w="100%"
          maxH="220px"
          mt={ 2 }
          p={ 4 }
          variant="filledInactive"
          fontSize="sm"
        />
        <CopyToClipboard text={ extractedData }/>
      </div>
    </Grid>
  );
};

export default React.memo(UserCreateDetails);
