import { FlatListProps } from 'react-native';

type _AOnSelectSingle = (value: string) => void;

type _AOnSelectMultiselect = (values: string[]) => void;

export type SelectorProps = {
  items: Array<any>;
  value?: string | string[];
  onSelect: _AOnSelectSingle | _AOnSelectMultiselect;
  horizontal?: boolean;
  multiselect?: boolean;
  contentContainerStyle?: FlatListProps<any>;
};

export type RenderItemProps = {
  id: number;
  value: string;
  description: string;
};
