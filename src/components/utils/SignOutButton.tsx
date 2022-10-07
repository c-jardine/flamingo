import { Text, TouchableOpacity, View } from 'react-native';
import MenuItem from '../core/MenuItem';
import { Color } from '../../styles/Color';
import Modal from '../core/Modal';
import { useDisclosure } from '../../hooks/useDisclosure';
import KButton from './KButton';
import { signOut } from '../../handlers/handleAuth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const SignOutButton = () => {
  const [isOpen, setIsOpen] = useDisclosure();
  return (
    <View>
      <MenuItem
        icon='logout'
        onPress={() => setIsOpen(true)}
        iconStyle={{ color: Color.text.body }}
      >
        Sign out
      </MenuItem>
      <Modal isVisible={isOpen} setIsVisible={setIsOpen}>
        <Text
          style={{
            color: Color.text.primary,
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
              backgroundColor: Color.success,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={signOut}
          >
            <MaterialCommunityIcons
              name='check-bold'
              size={24}
              color={Color.white}
            />
          </TouchableOpacity>
          <View style={{ width: 32 }} />
          <TouchableOpacity
            style={{
              flex: 1,
              borderRadius: 16,
              backgroundColor: Color.error,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setIsOpen(false)}
          >
            <MaterialCommunityIcons
              name='close-thick'
              size={24}
              color={Color.white}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default SignOutButton;
