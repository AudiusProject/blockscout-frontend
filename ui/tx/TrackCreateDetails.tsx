import {
  Grid,
  Textarea,
  Image,
} from '@chakra-ui/react';
import React from 'react';

import CopyToClipboard from 'ui/shared/CopyToClipboard';

interface TrackData {
  cid: string;
  data: {
    cover_art_sizes: string | null;
    title: string | null;
    // ... other fields as needed
  };
}

interface Props {
  data: string;
}

const CoverArt = ({ trackData }: { trackData: TrackData }) => {
  if (trackData?.data?.cover_art_sizes) {
    const imageUrl = `https://creatornode12.staging.audius.co/content/${ trackData.data.cover_art_sizes }/150x150.jpg`;
    return <Image src={ imageUrl } alt="Cover Art"/>;
  }

  return (
    <div>
    </div>
  );
};

const TrackCreateDetails = ({ data }: Props) => {
  const startIndex = data.indexOf('{"cid"');
  const endIndex = data.lastIndexOf('}}') + 2;
  if (startIndex === -1 || endIndex === -1) {
    return; // malformed or not found
  }

  const extractedData = data.substring(startIndex, endIndex);
  const trackData: TrackData = JSON.parse(extractedData);

  return (
    <Grid width="100%"columnGap={ 8 } rowGap={{ base: 3, lg: 3 }} templateColumns={{ base: 'minmax(0, 1fr)', lg: 'auto minmax(0, 1fr)' }}>
      <span>Entity Manager Action</span>
      <span>Track Create</span>
      <span>Title</span>
      <span>{ trackData?.data?.title }</span>
      <span>Cover Art</span>
      <CoverArt trackData={ trackData }/>
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

export default React.memo(TrackCreateDetails);
