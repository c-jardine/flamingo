import camelcaseKeys from 'camelcase-keys';
import { Formik, FormikValues } from 'formik';
import React from 'react';
import { View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { AuthContext, ThemeContext } from '../../../providers';
import useProfile from '../../../shared/hooks/useProfile';
import { ProfileSchema } from '../../../shared/schemas';
import { save } from '../../../shared/services';
import { supabase } from '../../../supabase/supabase';
import { Button, MenuContainer, Text } from '../../common';
import { Birthday } from '../Birthday';
import { Gender } from '../Gender';
import { Name } from '../Name';
import EditProfileSectionsProps from './EditProfile.types';

const EditProfile = () => {
  const { theme } = React.useContext(ThemeContext);
  const [activeSections, setActiveSections] = React.useState<number[]>([]);
  const { profile } = React.useContext(AuthContext);

  const sections = [
    {
      title: 'Name',
      content: `${profile?.firstName} ${profile?.lastName}`,
      contentComponent: <Name />,
    },
    {
      title: 'Birthday',
      content: profile?.dob?.toString(),
      contentComponent: <Birthday />,
    },
    {
      title: 'Gender',
      content: profile?.userGenders && profile.userGenders[0]?.gender,
      contentComponent: <Gender items={profile.userGenders[0]?.gender} />,
    },
    // {
    //   title: 'Location',
    //   content: profile?.location,
    //   contentComponent: <Location />,
    // },
  ];

  const _renderHeader = (section: EditProfileSectionsProps) => {
    return (
      <View
        style={{
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

  const _renderContent = (section: EditProfileSectionsProps) => {
    return (
      <View
        style={[
          { flex: 1, backgroundColor: 'red' },
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
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        dob: profile?.dob,
        gender: profile?.gender,
        location: profile?.location,
      }}
      validationSchema={ProfileSchema}
      onSubmit={(values) => save(values)}
    >
      {({ handleSubmit, values }) => (
        <View style={{ flex: 1 }}>
          <MenuContainer>
            <MenuContainer.Title icon='account-outline'>
              Personal details
            </MenuContainer.Title>
            <Accordion
              sections={sections}
              activeSections={activeSections}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
              underlayColor='transparent'
              sectionContainerStyle={{ marginTop: 16 }}
            />
          </MenuContainer>

          <Button
            label='Save'
            onPress={handleSubmit as (values: FormikValues) => void}
          />
        </View>
      )}
    </Formik>
  );
};

export default EditProfile;
