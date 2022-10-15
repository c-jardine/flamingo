import React from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const DumpsterFire = () => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View
      style={{
        backgroundColor: theme.colors.text[50],
        flex: 1,
        borderRadius: 16,
        marginTop: theme.spacing.md,
        padding: theme.spacing.md,
      }}
    >
      <Text style={{ color: theme.colors.text['800'] }}>Chat placeholder</Text>
    </View>
  );
};
export default DumpsterFire;
