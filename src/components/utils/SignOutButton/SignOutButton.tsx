import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDisclosure } from '../../../hooks/useDisclosure';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { signOut } from '../../../services/auth.service';
import { MenuItem, Modal } from '../../common';

const SignOutButton = () => {
  const { theme } = React.useContext(ThemeContext);

  const [isOpen, setIsOpen] = useDisclosure();
  return (
    <View>
      <MenuItem
        onPress={() => setIsOpen(true)}
        iconStyle={{ color: theme.colors.text['400'] }}
      >
        Sign out
      </MenuItem>
      <Modal isVisible={isOpen} setIsVisible={setIsOpen}>
        <Text
          style={{
            color: theme.colors.text['800'],
            fontWeight: 'bold',
            fontSize: 22,
            textAlign: 'center',
          }}
        >
          Are you sure?
        </Text>
        <View
          style={{
            marginTop: 32,
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 64,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              borderRadius: 16,
              backgroundColor: theme.colors.success,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={signOut}
          >
            <MaterialCommunityIcons
              name='check-bold'
              size={24}
              color={theme.colors.white}
            />
          </TouchableOpacity>
          <View style={{ width: 32 }} />
          <TouchableOpacity
            style={{
              flex: 1,
              borderRadius: 16,
              backgroundColor: theme.colors.error,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setIsOpen(false)}
          >
            <MaterialCommunityIcons
              name='close-thick'
              size={24}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default SignOutButton;
