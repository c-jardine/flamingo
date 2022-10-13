import React, { SetStateAction } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Color } from '../../styles/Color';

const TabSelector = ({
  items,
  selected,
  setSelected,
}: {
  items: Array<any>;
  selected: any;
  setSelected: React.Dispatch<SetStateAction<any>>;
}) => {
  const handler = (id: number) => {
    setSelected(id);
  };

  return (
    <View style={{ flexDirection: 'row', height: 48 }}>
      {items.map((item) => (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            key={item.id}
            style={{
              flex: 1,
              borderRadius: 16,
              height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                selected === item.id ? Color.accent[50] : Color.transparent,
            }}
            onPress={() => handler(item.id)}
          >
            {item.icon}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
export default TabSelector;
