import { FormikValues } from 'formik';
import { Vibration } from 'react-native';
import { Toast } from '../../components/common';
import { supabase } from '../../supabase';

export async function signIn(values: FormikValues) {
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    Vibration.vibrate(1000);
    Toast.error('Account not found');
  }
}

export async function signUp(values: FormikValues) {
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });

  if (!error) {
    return true;
  }
}

export async function signOut() {
  const { data: authUser, error: authUserError } =
    await supabase.auth.getUser();
  await supabase
    .from('profiles')
    .update({ is_online: false, last_online: new Date().toISOString() })
    .eq('id', authUser.user?.id);

  const { error } = await supabase.auth.signOut();
  if (!error) {
  }
  if (error) {
    alert(error.message);
  }
}
