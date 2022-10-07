import React from 'react';
import { Image, View } from 'react-native';

const PhotoView = ({ src }: { src: string }) => {
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: src }} />
    </View>
  );
};

export default PhotoView;
