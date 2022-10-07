import { Formik } from 'formik';
import React from 'react';
import { Text, View } from 'react-native';

import { saveProfile } from '../../handlers/handleAuth';
import { useAuthenticatedUserProfile } from '../../hooks/useAuthenticatedUserProfile';
import { ProfileGeneralSchema } from '../../validation/profileGeneralSchema';

import MenuContainer from '../core/MenuContainer';
import Birthday from '../editProfile/Birthday';
import Gender from '../editProfile/Gender';
import Location from '../editProfile/Location';
import Name from '../editProfile/Name';
import KButton from '../utils/KButton';

import Accordion from 'react-native-collapsible/Accordion';
import { Color } from '../../styles/Color';
import EditCard from '../editProfile/EditCard';

const ProfileForm = () => {
  const { loading, error, profile } = useAuthenticatedUserProfile();
  const [activeSections, setActiveSections] = React.useState([]);

  const SECTIONS = [
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
  ];

  const _renderHeader = (section) => {
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 16,
        }}
      >
        <Text
          style={{
            textTransform: 'uppercase',
            fontSize: 16,
            fontWeight: '400',
            color: Color.text.primary,
          }}
        >
          {section.title}
        </Text>
        <Text style={{ color: Color.text.body }}>{section.content}</Text>
      </View>
    );
  };

  const _renderContent = (section) => {
    return <>{section.contentComponent}</>;
  };

  const _updateSections = (activeSections) => {
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
      onSubmit={(values) => saveProfile(values)}
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
            />
            {/* <Name />
            <Birthday />
            <Gender /> */}
          </MenuContainer>

          {/* <Location /> */}

          <KButton label='Save' loading={false} onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default ProfileForm;
