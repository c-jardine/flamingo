import { format } from 'date-fns';
import { FormikValues, useFormikContext } from 'formik';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../../providers';
import { TextInput } from '../../form';

const Birthday = () => {
  const { user, session, profile } = React.useContext(AuthContext);
  const [dob, setDob] = React.useState<string>(
    format(new Date(profile?.dob || new Date()), 'MM/dd/yyyy')
  );

  const _handleSave = () => {
    const [month, day, year] = dob.split('/');
    setFieldValue(
      'dob',
      new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    );
  };

  const { values, handleChange, setFieldValue } =
    useFormikContext<FormikValues>();

  return (
    <View>
      <TextInput
        label='Birthday'
        value={dob}
        onChangeText={(text) => setDob(text)}
        maskType='date'
        keyboardType='number-pad'
      />
      {/* <MaskInput
        style={{
          padding: 16,
          fontSize: 16,
          fontWeight: '200',
          backgroundColor: isFocused ? Color.accent[50] : Color.transparent,
          color: isFocused ? Color.text.primary : Color.text.body,
        }}
        placeholderTextColor={Color.text.body}
        selectionColor={Color.primary}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        keyboardType='number-pad'
        value={dob}
        onChangeText={(masked, unmasked) => {
          setDob(masked);
        }}
        mask={Masks.DATE_MMDDYYYY}
      /> */}
      <TouchableOpacity onPress={_handleSave}>
        <Text style={{ fontSize: 32, color: 'white' }}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Birthday;
