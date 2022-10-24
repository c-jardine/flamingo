import { FormikValues } from 'formik';
import { Toast } from '../../components/common';
import { supabase } from '../../supabase';
/**
 * Save the authenticated user's profile.
 * @param {FormikValues} values The form's values to set the profile with.
 */
export async function save(values: FormikValues) {
  // Attempt to save the profile.
  const { data, error } = await supabase.from('profiles').upsert({
    // id: supabase.auth.user()?.id,
    first_name: values.firstName,
    last_name: values.lastName,
    dob: values.dob,
    gender: values.gender,
    location: values.location,
  });

  if (!error && data) {
    Toast.success('SUCCESS');
  }
  if (error) {
    Toast.error(error.message);
  }
}
