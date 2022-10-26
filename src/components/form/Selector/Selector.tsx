import React from 'react';
import { FlatList, View } from 'react-native';
import { ThemeContext } from '../../../providers';
import { SelectorItemProps, SelectorProps } from './Selector.types';
import SelectorItem from './SelectorItem';

const Selector = (props: SelectorProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <FlatList
      data={props.items}
      keyExtractor={(item: SelectorItemProps) => item.id}
      renderItem={({ item }) => {
        return (
          <SelectorItem
            item={item}
            horizontal={props.horizontal || false}
            length={props.items.length}
            selected={props.selectedValues.includes(item.value)}
            onPress={props.onSelect}
          />
        );
      }}
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
