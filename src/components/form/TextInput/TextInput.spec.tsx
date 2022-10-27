import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { render } from '@testing-library/react-native';
import React from 'react';
import TextInput from './TextInput';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('../../../supabase/supabase.ts');

describe('<TextInput />', () => {
  it('should update the input text', async () => {
    const { getByPlaceholderText } = render(
      <TextInput placeholder='Test input' />
    );
    const textInput = getByPlaceholderText('Test input');
    expect(textInput).not.toBeNull();
  });
});
