import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../providers';
import { Text } from '../../common';
import { RenderItemProps } from './Selector.types';

const SelectorItem = (props: RenderItemProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.item.value)}
      style={[
        props.horizontal
          ? {
              flexBasis: `${100 / props.length}%`,
              alignItems: 'center',
              paddingVertical: theme.spacing.lg,
            }
          : { paddingVertical: theme.spacing.md },
        {
          paddingHorizontal: theme.spacing.md,
          backgroundColor: props.selected
            ? theme.colors.text['900']
            : theme.colors.text['50'],
          borderRadius: props.horizontal ? 0 : 16,
          justifyContent: 'center',
        },
      ]}
    >
      <Text
        style={{
          color: props.selected ? theme.colors.black : theme.colors.text['600'],
          textTransform: 'uppercase',
        }}
      >
        {props.item.value}
      </Text>
      {props.item.description && (
        <Text
          style={{
            color: props.selected
              ? theme.colors.baseSecondary['500']
              : theme.colors.text['300'],
            fontSize: 12,
          }}
        >
          {props.item.description}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default SelectorItem;
