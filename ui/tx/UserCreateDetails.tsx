import {
  Grid,
  GridItem,
  Textarea,
  Image,
  Box,
} from '@chakra-ui/react';
import React from 'react';

import buildImageUrl from 'lib/audius/buildImageUrl';
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
    // const imageUrl = `https://creatornode12.staging.audius.co/content/${ userData.data.profile_picture_sizes }/150x150.jpg`;
    const imageUrl = buildImageUrl(userData.data.profile_picture_sizes, '150x150.jpg');
    return <Image src={ imageUrl } alt="Profile Picture"/>;
  }

  return (
    <>
    None
    </>
  );
};

const CoverPhoto = ({ userData }: { userData: UserData }) => {
  if (userData?.data?.cover_photo_sizes) {
    // const imageUrl = `https://creatornode12.staging.audius.co/content/${ userData.data.cover_photo_sizes }/640x.jpg`;
    const imageUrl = buildImageUrl(userData.data.cover_photo_sizes, '640x.jpg');
    return <Image src={ imageUrl } alt="Cover Photo"/>;
  }

  return (
    <>
    None
    </>
  );
};

const UserCreateDetails = ({ data }: Props) => {
  const startIndex = data.indexOf('{"cid"');
  const endIndex = data.lastIndexOf('}}') + 2;
  if (startIndex === -1 || endIndex === -1) {
    return null; // malformed or not found
  }

  const extractedData = data.substring(startIndex, endIndex);
  const userData: UserData = JSON.parse(extractedData) as UserData;

  return (
    <Grid width="100%"columnGap={ 8 } rowGap={{ base: 3, lg: 3 }} templateColumns={{ base: 'minmax(0, 1fr)', lg: 'auto minmax(0, 1fr)' }}>
      <GridItem>Entity Manager Action</GridItem>
      <GridItem>User Create</GridItem>
      <GridItem>Handle</GridItem>
      <GridItem>@{ userData?.data?.handle }</GridItem>
      <GridItem>Name</GridItem>
      <GridItem>{ userData?.data?.name }</GridItem>
      <GridItem>Profile Picture</GridItem>
      <ProfilePicture userData={ userData }/>
      <GridItem>Cover Photo</GridItem>
      <CoverPhoto userData={ userData }/>
      <GridItem>Data</GridItem>
      <GridItem display="flex">
        <Box flexGrow={ 1 }>
          <Textarea
            value={ extractedData }
            w="100%"
            maxH="220px"
            mt={ 2 }
            p={ 4 }
            variant="filledInactive"
            fontSize="sm"
          />
        </Box>
        <Box>
          <CopyToClipboard text={ extractedData }/>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default React.memo(UserCreateDetails);
