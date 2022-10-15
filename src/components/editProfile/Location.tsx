import Constants from 'expo-constants';
import { FormikValues, useFormikContext } from 'formik';
import React from 'react';
import { ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ThemeContext } from '../../provider/ThemeProvider';

const Location = () => {
  const { theme } = React.useContext(ThemeContext);

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
            backgroundColor: theme.colors.transparent,
            color: theme.colors.text['800'],
            borderRadius: 16,
          },
          listView: {
            borderRadius: 16,
            backgroundColor: theme.colors.text['50'],
          },
          row: {
            backgroundColor: theme.colors.transparent,
          },
          description: {
            color: theme.colors.text['800'],
            fontSize: 16,
            paddingVertical: 8,
          },
          separator: {
            backgroundColor: theme.colors.text[100],
          },
          poweredContainer: { display: 'none' },
        }}
      />
    </ScrollView>
  );
};

export default Location;
