import { FormikValues } from 'formik';
import { Vibration } from 'react-native';
import { Toast } from '../../components/common';
import { supabase } from '../../supabase';

export async function signIn(values: FormikValues) {
  const { user, error } = await supabase.auth.signIn({
    email: values.email,
    password: values.password,
  });
  if (!error && user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (data) {
      await supabase
        .from('profiles')
        .update({ is_online: true, last_online: new Date().toISOString() })
        .eq('id', supabase.auth.user()?.id);
    }
  }
  if (error) {
    Vibration.vibrate(1000);
    Toast.error('Account not found');
  }
}

export async function signUp(values: FormikValues) {
  const { user, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });
  if (!error && !user) {
    return user;
  }
  if (error) {
    throw error;
  }
  return user;
}

export async function signOut() {
  await supabase
    .from('profiles')
    .update({ is_online: false, last_online: new Date().toISOString() })
    .eq('id', supabase.auth.user()?.id);

  const { error } = await supabase.auth.signOut();
  if (!error) {
  }
  if (error) {
    alert(error.message);
  }
}
