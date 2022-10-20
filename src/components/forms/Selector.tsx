import { FormikValues, useFormikContext } from 'formik';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const Selector = ({ items, field }: { items: Array<any>; field: string }) => {
  const { theme } = React.useContext(ThemeContext);

  const { setFieldValue, values } = useFormikContext<FormikValues>();
  const [selected, setSelected] = React.useState(values[field]);

  React.useEffect(() => {
    if (values[field]) {
      setSelected(values[field]);
    }
  }, [values[field]]);

  const handler = (value: string) => {
    setSelected(value);
    setFieldValue(field, value);
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {items.map((item, index) => (
        <View
          key={item.id}
          style={{
            flex: 1,
            height: 48,
            marginLeft:
              index > 0 && index < items.length ? theme.spacing.sm : 0,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              borderRadius: 16,
              justifyContent: 'center',
              backgroundColor:
                selected === item.value
                  ? theme.colors.text[900]
                  : theme.colors.text[50],
            }}
            onPress={() => handler(item.value)}
          >
            <Text
              style={{
                textAlign: 'center',
                color:
                  selected === item.value
                    ? theme.colors.black
                    : theme.colors.text['400'],
                textTransform: 'uppercase',
              }}
            >
              {item.value}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
export default Selector;
