import config from 'configs/app';

export default function buildImageUrl(id: string, variant: string) {
  // TODO: Healthy node selection
  const creatorNode = config.app.audiusEnv === 'stage' ? 'creatornode12.staging.audius.co' : 'creatornode2.audius.co';

  return `https://${ creatorNode }/content/${ id }/${ variant }`;
}
