import { Formik, FormikValues } from 'formik';
import React from 'react';
import { Text, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { useAuthenticatedUserProfile } from '../../hooks/useAuthenticatedUserProfile';
import { ThemeContext } from '../../provider/ThemeProvider';
import { save } from '../../services/profiles.service';
import { AccordionMenuItemProps } from '../../types/core/accordionMenuItemProps';
import { ProfileGeneralSchema } from '../../validation/profileGeneralSchema';
import KButton from '../core/Button/Button';
import MenuContainer from '../core/MenuContainer';
import Birthday from '../editProfile/Birthday';
import Gender from '../editProfile/Gender';
import Location from '../editProfile/Location';
import Name from '../editProfile/Name';

const ProfileForm = () => {
  const { theme } = React.useContext(ThemeContext);

  const { loading, error, profile } = useAuthenticatedUserProfile();
  const [activeSections, setActiveSections] = React.useState<number[]>([]);

  const SECTIONS: AccordionMenuItemProps[] = [
    {
      title: 'Name',
      content: `${profile?.first_name} ${profile?.last_name}`,
      contentComponent: <Name />,
    },
    {
      title: 'Birthday',
      content: profile?.dob?.toString(),
      contentComponent: <Birthday />,
    },
    {
      title: 'Gender',
      content: profile?.gender,
      contentComponent: <Gender />,
    },
    {
      title: 'Location',
      content: profile?.location,
      contentComponent: <Location />,
    },
  ];

  const _renderHeader = (section: AccordionMenuItemProps) => {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 16,
          paddingBottom: 8,
        }}
      >
        <Text
          style={{
            textTransform: 'uppercase',
            fontSize: 16,
            fontWeight: '400',
            color: theme.colors.text['800'],
          }}
        >
          {section.title}
        </Text>
        <Text style={{ color: theme.colors.text['400'] }}>
          {section.content}
        </Text>
      </View>
    );
  };

  const _renderContent = (section: AccordionMenuItemProps) => {
    return (
      <View
        style={[
          section.title !== 'Gender' && {
            backgroundColor: theme.colors.text[50],
            paddingHorizontal: 16,
            paddingTop: 8,
            borderRadius: 16,
          },
        ]}
      >
        {section.contentComponent}
      </View>
    );
  };

  const _updateSections = (activeSections: number[]) => {
    setActiveSections(activeSections);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: profile.first_name,
        lastName: profile.last_name,
        dob: profile.dob,
        gender: profile.gender,
        location: profile.location,
      }}
      validationSchema={ProfileGeneralSchema}
      onSubmit={(values) => save(values)}
    >
      {({ handleSubmit, values }) => (
        <View>
          <MenuContainer>
            <MenuContainer.Title icon='account-outline'>
              Personal details
            </MenuContainer.Title>
            <Accordion
              sections={SECTIONS}
              activeSections={activeSections}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
              underlayColor='transparent'
              sectionContainerStyle={{ marginTop: 16 }}
            />
          </MenuContainer>

          <KButton
            label='Save'
            loading={false}
            onPress={handleSubmit as (values: FormikValues) => void}
          />
        </View>
      )}
    </Formik>
  );
};

export default ProfileForm;
