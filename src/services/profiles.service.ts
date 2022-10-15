import { FormikValues } from 'formik';
import { KToast } from '../components/utils/KToast';
import { supabase } from '../initSupabase';
/**
 * Save the authenticated user's profile.
 * @param {FormikValues} values The form's values to set the profile with.
 */
export async function save(values: FormikValues) {
  // Attempt to save the profile.
  const { data, error } = await supabase.from('profiles').upsert({
    id: supabase.auth.user()?.id,
    first_name: values.firstName,
    last_name: values.lastName,
    dob: values.dob,
    gender: values.gender,
    location: values.location,
  });

  if (!error && data) {
    KToast.success('SUCCESS');
  }
  if (error) {
    KToast.error(error.message);
  }
}
