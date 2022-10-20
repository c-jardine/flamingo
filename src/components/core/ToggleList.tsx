import { useFormikContext } from 'formik';
import React from 'react';
import {
  FlatList,
  FlatListProps,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';
import { ProfileProps } from '../../types/core/profileProps';
import { ToggleListItemProps } from '../../types/core/ToggleListProps';

const ToggleList = (
  props: FlatListProps<any> & { handleToggle: (value: string) => void }
) => {
  const { theme } = React.useContext(ThemeContext);

  const { values } = useFormikContext<ProfileProps>();

  const _renderItem = ({ item }: { item: ToggleListItemProps }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.handleToggle(item.label);
        }}
        style={{
          paddingHorizontal: theme.spacing.md,
          height: 48,
          backgroundColor:
            values.gender.identities &&
            values.gender.identities.includes(item.label)
              ? theme.colors.text['900']
              : theme.colors.text['50'],
          borderRadius: 16,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color:
              values.gender.identities &&
              values.gender.identities.includes(item.label)
                ? theme.colors.black
                : theme.colors.text['400'],
            textTransform: 'uppercase',
          }}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={props.data}
      keyExtractor={(item) => item.id}
      renderItem={_renderItem}
      contentContainerStyle={{ flexGrow: 1 }}
      ItemSeparatorComponent={() => (
        <View style={{ height: theme.spacing.md }} />
      )}
      style={[props.contentContainerStyle]}
    />
  );
};

export default ToggleList;
