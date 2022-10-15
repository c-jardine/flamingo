import React, { SetStateAction } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const TabSelector = ({
  items,
  selected,
  setSelected,
}: {
  items: Array<any>;
  selected: any;
  setSelected: React.Dispatch<SetStateAction<any>>;
}) => {
  const { theme } = React.useContext(ThemeContext);

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
                selected === item.id
                  ? theme.colors.text['50']
                  : theme.colors.transparent,
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
