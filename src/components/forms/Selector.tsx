import React from 'react';
import {
  FlatList,
  FlatListProps,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

interface SelectorProps {
  items: Array<any>;
  initialSelected?: string;
  onSelect: (value: string) => void;
  horizontal?: boolean;
  contentContainerStyle?: FlatListProps<any>;
}

const Selector = (props: SelectorProps) => {
  const { theme } = React.useContext(ThemeContext);

  const [selected, setSelected] = React.useState<string | string[]>();

  React.useEffect(() => {
    props.initialSelected && setSelected(props.initialSelected);
  }, []);

  const handler = (value: string) => {
    setSelected(value);
    return props.onSelect(value);
  };

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handler(item.value);
        }}
        style={{
          // flex: 1,
          padding: theme.spacing.md,
          backgroundColor:
            selected && selected.includes(item.value)
              ? theme.colors.text['900']
              : theme.colors.text['50'],
          borderRadius: 16,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color:
              selected && selected.includes(item.value)
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
              color:
                selected && selected.includes(item.value)
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
      keyExtractor={(item) => item.id}
      renderItem={_renderItem}
      ItemSeparatorComponent={() => (
        <View
          style={
            props.horizontal
              ? { width: theme.spacing.md }
              : { height: theme.spacing.md }
          }
        />
      )}
      horizontal={props.horizontal}
      // style={[props.contentContainerStyle, {width: '100%'}]}
      // contentContainerStyle={{width: '33%'}}
      scrollEnabled={false}
    />
    // <View style={{ flexDirection: 'row' }}>
    //   {props.items.map((item, index) => (
    //     <View
    //       key={item.id}
    //       style={{
    //         flex: 1,
    //         height: 48,
    //         marginLeft:
    //           index > 0 && index < props.items.length ? theme.spacing.sm : 0,
    //       }}
    //     >
    //       <TouchableOpacity
    //         style={{
    //           flex: 1,
    //           borderRadius: 16,
    //           justifyContent: 'center',
    //           backgroundColor:
    //             selected === item.value
    //               ? theme.colors.text[900]
    //               : theme.colors.text[50],
    //         }}
    //         onPress={() => handler(item.value)}
    //       >
    //         <Text
    //           style={{
    //             textAlign: 'center',
    //             color:
    //               selected === item.value
    //                 ? theme.colors.black
    //                 : theme.colors.text['400'],
    //             textTransform: 'uppercase',
    //           }}
    //         >
    //           {item.value}
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   ))}
    // </View>
  );
};
export default Selector;
