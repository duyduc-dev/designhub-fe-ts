import { Image } from 'react-konva';
import useImage from 'use-image';

type Props = {
  url: string;
  [key: string]: any;
};

const ImageShape = ({ url, ...props }: Props) => {
  const [image] = useImage(url);
  return <Image {...props} image={image} />;
};

export default ImageShape;
