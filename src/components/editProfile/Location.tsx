import Constants from 'expo-constants';
import { FormikValues, useFormikContext } from 'formik';
import React from 'react';
import { ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDisclosure } from '../../hooks/useDisclosure';
import { Color } from '../../styles/Color';

const Location = () => {
  const [isOpen, setIsOpen] = useDisclosure();

  const { values, setFieldValue } = useFormikContext<FormikValues>();

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps={'handled'}
    >
      <GooglePlacesAutocomplete
        placeholder='Enter your location'
        onPress={(data, details) => setFieldValue('location', data.description)}
        query={{
          key: Constants?.manifest?.extra?.googlePlacesApiKey,
          language: 'en',
          components: 'country:us',
          minLength: 3,
        }}
        styles={{
          textInput: {
            backgroundColor: Color.transparent,
            color: Color.text.primary,
            borderRadius: 16,
          },
          listView: {
            borderRadius: 16,
            backgroundColor: Color.accent[50],
          },
          row: {
            backgroundColor: Color.transparent,
          },
          description: {
            color: Color.text.primary,
            fontSize: 16,
            paddingVertical: 8,
          },
          separator: {
            backgroundColor: Color.accent[100],
          },
          poweredContainer: { display: 'none' },
        }}
      />
    </ScrollView>
  );
};

export default Location;
