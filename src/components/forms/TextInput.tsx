import React from 'react';
import { TextInput as RNTextInput, TextInputProps, View } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const TextInput = (props: TextInputProps & { leftComponent: JSX.Element }) => {
  const { theme } = React.useContext(ThemeContext);

  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.text['50'],
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      {props.leftComponent && (
        <View style={{ position: 'absolute', top: 14, left: 16 }}>
          {props.leftComponent}
        </View>
      )}
      <RNTextInput
        {...props}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        maxLength={32}
        // isFocused={isFocused}
        selectionColor={theme.colors.primary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          color: theme.colors.text['800'],
          padding: 16,
          paddingLeft: props.leftComponent ? 48 : 16,
          // borderRadius: 16,
          // overflow: 'hidden',
        }}
        // labelStyles={{
        //   width: '100%',
        //   paddingLeft: props.leftComponent ? theme.spacing.sm : 0,
        // }}
        // inputStyles={{
        //   width: '100%',
        //   // backgroundColor: 'red',
        //   color: isFocused ? theme.colors.text['800'] : theme.colors.text['300'],
        //   fontSize: 16,
        //   paddingLeft: props.leftComponent ? theme.spacing.sm : 0,
        // }}
      />
    </View>
  );
};

export default TextInput;
