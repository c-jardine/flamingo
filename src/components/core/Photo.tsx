import React from 'react';
import {
  Image,
  ImageProps,
  ImageStyle,
  View,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '../../initSupabase';
import { Color } from '../../styles/Color';
import { PhotoProps } from '../../types';

const Photo = (props: PhotoProps) => {
  const [src, setSrc] = React.useState<string>();
  const [showPlaceholder, setShowPlaceholder] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (props.path) {
      const { data, error } = supabase.storage
        .from('albums')
        .getPublicUrl(props.path);
      setSrc(data?.publicURL);
    }
  }, [props.path]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {showPlaceholder && (
        <View
          style={{
            backgroundColor: Color.accent[50],
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size='large' color={Color.primary} />
        </View>
      )}
      <Image
        {...props}
        onLoadStart={() => setShowPlaceholder(true)}
        onLoadEnd={() => setShowPlaceholder(false)}
        source={{
          uri: src,
        }}
        style={{ ...props.imgStyle }}
      />
    </View>
  );
};

export default Photo;
