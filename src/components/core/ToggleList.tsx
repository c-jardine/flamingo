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
import { ToggleListItemProps } from '../../types/core/ToggleListProps';
import { ProfileProps } from '../../types/profile';

const ToggleList = (
  props: Omit<FlatListProps<any>, 'renderItem'> & {
    handleToggle: (value: string) => void;
  }
) => {
  const { theme } = React.useContext(ThemeContext);

  const { values } = useFormikContext<ProfileProps>();

  const _renderItem = ({ item }: { item: ToggleListItemProps }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.handleToggle(item.value);
        }}
        style={{
          padding: theme.spacing.md,
          backgroundColor:
            values.gender.identities &&
            values.gender.identities.includes(item.value)
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
              values.gender.identities.includes(item.value)
                ? theme.colors.black
                : theme.colors.text['600'],
            textTransform: 'uppercase',
          }}
        >
          {item.value}
        </Text>
        {item.description && (
          <Text
            style={{
              color:
                values.gender.identities &&
                values.gender.identities.includes(item.value)
                  ? theme.colors.baseSecondary['500']
                  : theme.colors.text['300'],
              fontSize: 12,
            }}
          >
            {item.description}
          </Text>
        )}
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
