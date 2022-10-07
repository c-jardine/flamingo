import { Text, View } from 'react-native';
import { Color } from '../../styles/Color';
import { TYPOGRAPHY } from '../../styles/typography';

const Title = ({ children }: { children: string }) => {
  return <Text style={[TYPOGRAPHY.h1]}>{children}</Text>;
};

const Description = ({ children }: { children: string }) => {
  return <Text style={{ color: Color.text.body }}>{children}</Text>;
};

const Header = ({ children }: { children: any }) => {
  return (
    <View
      style={{
        marginTop: 8,
      }}
    >
      {children}
    </View>
  );
};

Header.Title = Title;
Header.Description = Description;

export default Header;
