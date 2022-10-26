import { FlatListProps } from 'react-native';

export type SelectorProps = {
  items: Array<any>;
  onSelect: (values: string) => void;
  horizontal?: boolean;
  contentContainerStyle?: FlatListProps<any>;
  selectedValues: string[];
};

export type SelectorItemProps = {
  id: string;
  value: string;
  description: string;
};

export type RenderItemProps = {
  item: SelectorItemProps;
  horizontal: boolean;
  length: number;
  selected: boolean;
  onPress: (value: string) => void;
};
