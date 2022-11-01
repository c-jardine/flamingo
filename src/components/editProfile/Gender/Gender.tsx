import React from 'react';
import { View } from 'react-native';
import { Selector } from '../../form';

const items = [
  { id: 1, label: 'Man' },
  { id: 2, label: 'Woman' },
  { id: 3, label: 'Nonbinary' },
];

const Gender = (items) => {
  React.useEffect(() => {
    console.log(items);
  });
  return (
    <View>
      <Selector
        items={items}
        // selectedValues={items[0]}
        onSelect={() => {
          return;
        }}
      />
    </View>
  );
};
export default Gender;
