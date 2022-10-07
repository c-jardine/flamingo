import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { SetStateAction } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Color } from '../../styles/Color';

/**
 * Component containing the selected value for display.
 */
const Display = ({
  children,
  title,
  isOpen,
  setIsOpen,
}: {
  children: any;
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => setIsOpen(!isOpen)}
      >
        <View>
          <Text
            style={{
              textTransform: 'uppercase',
              fontSize: 16,
              fontWeight: '400',
              color: Color.text.primary,
            }}
          >
            {title}
          </Text>
          <View
            style={{
              marginTop: 4,
            }}
          >
            {children}
          </View>
        </View>

        <MaterialCommunityIcons
          name={isOpen ? 'chevron-down' : 'chevron-right'}
          size={32}
          color={Color.text.body}
        />
      </TouchableOpacity>
    </View>
  );
};

/**
 * The component to display while editing the card.
 */
const Editor = ({ children, isOpen }: { children: any; isOpen: boolean }) => {
  return (
    <View style={{ width: '100%', display: isOpen ? 'flex' : 'none' }}>
      {children}
    </View>
  );
};

/**
 * The main card.
 */
const EditCard = ({
  icon,
  children,
}: {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  children: any;
}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 16,
      }}
    >
      <View
        style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}
      >
        {children}
      </View>
    </View>
  );
};

EditCard.Display = Display;
EditCard.Editor = Editor;

export default EditCard;
