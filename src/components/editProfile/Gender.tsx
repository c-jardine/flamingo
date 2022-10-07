import { useAuthenticatedUserProfile } from '../../hooks/useAuthenticatedUserProfile';
import Selector from '../forms/Selector';
import EditCard from './EditCard';
import { useDisclosure } from '../../hooks/useDisclosure';
import { useFormikContext, FormikValues } from 'formik';
import { Text } from 'react-native';
import { Color } from '../../styles/Color';

const items = [
  { id: 1, label: 'Man' },
  { id: 2, label: 'Woman' },
  { id: 3, label: 'Nonbinary' },
];

const Gender = () => {
  const [isOpen, setIsOpen] = useDisclosure();
  const { values } = useFormikContext<FormikValues>();

  return (
    <EditCard icon='gender-transgender'>
      <EditCard.Display title='Gender' isOpen={isOpen} setIsOpen={setIsOpen}>
        <Text style={{ color: Color.text.body }}>{values.gender}</Text>
      </EditCard.Display>
      <EditCard.Editor isOpen={isOpen}>
        <Selector items={items} field='gender' />
      </EditCard.Editor>
    </EditCard>
  );
};
export default Gender;
