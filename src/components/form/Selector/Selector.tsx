import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../../providers';
import { RenderItemProps, SelectorProps } from './Selector.types';

const Selector = (props: SelectorProps) => {
  const { theme } = React.useContext(ThemeContext);

  const [selected, setSelected] = React.useState<string | string[]>(
    props.multiselect ? [] : ''
  );

  React.useEffect(() => {
    props.value && setSelected(props.value);
  }, []);

  const _handleMultiselect = (value: string) => {
    if (props.multiselect) {
      let arr = (props.value as string[]) || [];
      if (arr.includes(value)) {
        arr.splice(arr.indexOf(value), 1);
      } else {
        arr.push(value);
      }
      setSelected(arr as string[]);
      return props.onSelect(arr);
    }
  };

  const _handleSingle = (value: string) => {
    setSelected(value);
    return props.onSelect(value);
  };

  const _renderItem = ({ item }: { item: RenderItemProps }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.multiselect
            ? _handleMultiselect(item.value)
            : _handleSingle(item.value);
        }}
        style={[
          props.horizontal && {
            flexBasis: `${100 / props.items.length}%`,
            alignItems: 'center',
          },
          {
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.md,
            backgroundColor: props.multiselect
              ? selected.includes(item.value)
                ? theme.colors.text['900']
                : theme.colors.text['50']
              : selected === item.value
              ? theme.colors.text['900']
              : theme.colors.text['50'],
            borderRadius: props.horizontal ? 0 : 16,
            justifyContent: 'center',
          },
        ]}
      >
        <Text
          style={{
            color: props.multiselect
              ? selected.includes(item.value)
                ? theme.colors.black
                : theme.colors.text['600']
              : selected === item.value
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
              color: props.multiselect
                ? selected.includes(item.value)
                  ? theme.colors.baseSecondary['500']
                  : theme.colors.text['300']
                : selected === item.value
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
      data={props.items}
      keyExtractor={(item: RenderItemProps) => item.id}
      renderItem={_renderItem}
      ItemSeparatorComponent={() => (
        <View
          style={
            !props.horizontal && {
              width: theme.spacing.sm,
              height: theme.spacing.sm,
            }
          }
        />
      )}
      horizontal={props.horizontal}
      contentContainerStyle={[
        props.contentContainerStyle,
        {
          width: '100%',
        },
      ]}
      scrollEnabled={!props.horizontal}
    />
  );
};
export default Selector;
