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
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={{
            flex: 1,
            borderRadius: 16,
            height: 48,
            justifyContent: 'center',
            backgroundColor:
              selected === item.label
                ? theme.colors.text[50]
                : theme.colors.transparent,
          }}
          onPress={() => handler(item.label)}
        >
          <Text
            style={{
              textAlign: 'center',
              color:
                selected === item.label
                  ? theme.colors.text['800']
                  : theme.colors.text['400'],
              textTransform: 'uppercase',
            }}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default Selector;
