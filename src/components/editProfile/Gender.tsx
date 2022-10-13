import { View } from 'react-native';
import Selector from '../forms/Selector';

const items = [
  { id: 1, label: 'Man' },
  { id: 2, label: 'Woman' },
  { id: 3, label: 'Nonbinary' },
];

const Gender = () => {
  return (
    <View>
      <Selector items={items} field='gender' />
    </View>
  );
};
export default Gender;
