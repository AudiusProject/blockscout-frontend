import { Box, Image, Link, Text, chakra } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { ndash } from 'lib/html-entities';

type AdData = {
  ad: {
    name: string;
    description_short: string;
    thumbnail: string;
    url: string;
    cta_button: string;
    impressionUrl: string;
  };
}

const CoinzillaTextAd = ({ className }: {className?: string}) => {
  const [ adData, setAdData ] = React.useState<AdData | null>(null);
  useEffect(() => {
    fetch('https://request-global.czilladx.com/serve/native.php?z=19260bf627546ab7242')
      .then(res => res.status === 200 ? res.json() : null)
      .then((data) => {
        setAdData(data);
        if (data?.ad?.impressionUrl) {
          fetch(data.ad.impressionUrl);
        }
      });
  }, []);

  if (!adData) {
    return null;
  }

  const urlObject = new URL(adData.ad.url);

  return (
    <Box className={ className }>
      <Text
        as="span"
        whiteSpace="pre-wrap"
        fontWeight={ 700 }
        mr={ 3 }
        display={{ base: 'none', lg: 'inline' }}
      >
        ADs:
      </Text>
      { urlObject.hostname === 'nifty.ink' ?
        <Text as="span" mr={ 1 }>🎨</Text> :
        <Image src={ adData.ad.thumbnail } width="20px" height="20px" mb="-4px" mr={ 1 } display="inline" alt=""/>
      }
      <Text as="span" whiteSpace="pre-wrap">{ `${ adData.ad.name } ${ ndash } ${ adData.ad.description_short } ` }</Text>
      <Link href={ adData.ad.url }>{ adData.ad.cta_button }</Link>
    </Box>
  );
};

export default chakra(CoinzillaTextAd);
