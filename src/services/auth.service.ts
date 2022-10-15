import { format, toDate } from 'date-fns';
import { FormikValues } from 'formik';
import { Vibration } from 'react-native';
import { KToast } from '../components/utils/KToast';
import { supabase } from '../initSupabase';

export async function signIn(values: FormikValues) {
  const { user, error } = await supabase.auth.signIn({
    email: values.email,
    password: values.password,
  });
  if (!error && user) {
    await supabase
      .from('profiles')
      .update({ is_online: true, last_online: new Date().toISOString() })
      .eq('id', supabase.auth.user()?.id);
  }
  if (error) {
    Vibration.vibrate(1000);
    KToast.error('INVALID CREDENTIALS');
  }
}

export async function signUp(values: FormikValues) {
  const { user, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });
  if (!error && !user) {
    alert('Check your email for the login link!');
  }
  if (error) {
    alert(error.message);
  }
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
