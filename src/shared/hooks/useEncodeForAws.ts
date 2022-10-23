import { Buffer } from 'buffer';
import { CameraCapturedPicture } from 'expo-camera';
import React from 'react';

export const useEncodeForAws = (image: CameraCapturedPicture | null) => {
  const [data, setData] = React.useState<Buffer | null>(null);

  React.useEffect(() => {
    const result = image?.base64 as string;
    const b = Buffer.from(result, 'base64');

    setData(b);
  });

  return [data];
};
