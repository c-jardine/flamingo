import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../../providers';
import { useDisclosure } from '../../../shared/hooks/useDisclosure';
import { Modal } from '../Modal';
import { Text } from '../Text';
import ThumbnailProps from './Thumbnail.types';

const Thumbnail = (props: ThumbnailProps) => {
  const { theme } = React.useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useDisclosure();

  return (
    <View
      style={{
        width: `${100 / 3}%`,
        aspectRatio: 1,
        padding: 4,
      }}
    >
      <TouchableOpacity
        onPress={() => setIsModalOpen(true)}
        style={{
          backgroundColor: theme.colors.text[50],
          borderRadius: 16,
          overflow: 'hidden',
        }}
      >
        <Image
          source={{ uri: props.uri }}
          style={{ width: '100%', height: '100%' }}
        />
      </TouchableOpacity>
      <Modal isVisible={isModalOpen} setIsVisible={setIsModalOpen}>
        <View>
          <Text style={{ fontSize: 18, marginTop: theme.spacing.md }}>
            Edit photo
          </Text>
          <TouchableOpacity
            style={{ paddingVertical: theme.spacing.lg }}
            onPress={props.onDelete}
          >
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Thumbnail;
