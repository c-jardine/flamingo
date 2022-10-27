import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { ThemeContext } from '../../../providers';
import { Text } from '../Text';
import { getPhoto } from './Photo.actions';
import { PhotoProps } from './Photo.types';

const Photo = (props: PhotoProps) => {
  const { theme } = React.useContext(ThemeContext);

  const [src, setSrc] = React.useState<string>();
  const [showPlaceholder, setShowPlaceholder] = React.useState<boolean>(false);

  React.useEffect(() => {
    try {
      const res = getPhoto(props.path);
      setSrc(res);
    } catch (error) {
      console.log(error);
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
            backgroundColor: theme.colors.text['50'],
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size='large' color={theme.colors.primary} />
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
