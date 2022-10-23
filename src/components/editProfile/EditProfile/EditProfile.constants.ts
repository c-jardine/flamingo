import React from 'react';
import { Birthday, Gender, Location, Name } from '../';
import { ProfileProps } from '../../../types/profile';
import EditProfileSectionsProps from './EditProfile.types';

const editProfileSections = (
  profile: ProfileProps
): EditProfileSectionsProps[] => {
  return [
    {
      title: 'Name',
      content: `${profile?.firstName} ${profile?.lastName}`,
      contentComponent: React.createElement(Name, {}),
    },
    {
      title: 'Birthday',
      content: profile?.dob?.toString(),
      contentComponent: React.createElement(Birthday, {}),
    },
    {
      title: 'Gender',
      content: profile?.gender,
      contentComponent: React.createElement(Gender, {}),
    },
    {
      title: 'Location',
      content: profile?.location,
      contentComponent: React.createElement(Location, {}),
    },
  ];
};

export default editProfileSections;
