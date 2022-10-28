import { FormikValues } from 'formik';
import { Vibration } from 'react-native';
import { Toast } from '../../components/common';
import { supabase } from '../../supabase';

export async function signIn(values: FormikValues) {
  if (values.email && values.password) {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      Vibration.vibrate(1000);
      Toast.error('Account not found');
    }
  }
}

export async function signUp(values: FormikValues) {
  if (values.email && values.password) {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (!error) {
      return true;
    }
  }
}

export async function signOut() {
  const { data: authUser, error: authUserError } =
    await supabase.auth.getUser();
  const userId = authUser.user?.id;
  if (userId !== undefined) {
    await supabase
      .from('profiles')
      .update({ is_online: false, last_online: new Date().toISOString() })
      .eq('id', userId);

    const { error } = await supabase.auth.signOut();
  }
}
