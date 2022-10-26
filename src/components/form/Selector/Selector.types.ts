import { FlatListProps } from 'react-native';

type _AOnSelectMultiselect = (values: string[]) => void;

export type SelectorProps = {
  items: Array<any>;
  value?: string | string[];
  onSelect: _AOnSelectMultiselect;
  horizontal?: boolean;
  multiselect?: boolean;
  contentContainerStyle?: FlatListProps<any>;
};

export type RenderItemProps = {
  id: number;
  value: string;
  description: string;
};
