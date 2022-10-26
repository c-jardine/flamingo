import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { useFormikContext } from 'formik';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ArrowNavigator, Thumbnail } from '../../../components/common';
import { FormPageLayout } from '../../../components/layouts';
import { ThemeContext } from '../../../providers';
import { useDisclosure } from '../../../shared/hooks/useDisclosure';
import { ProfileProps } from '../../../shared/types';
import { supabase } from '../../../supabase';
import { PhotoUploadScreenProps } from './PhotoUploadScreen.types';

const accessKeyId = Constants?.manifest?.extra?.awsAccessKeyId as string;
const secretKey = Constants?.manifest?.extra?.awsSecretAccessKey as string;

const PhotoUploadScreen = (props: PhotoUploadScreenProps) => {
  const { theme } = React.useContext(ThemeContext);
  const [images, setImages] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useDisclosure();

  const { values, errors, setFieldValue } = useFormikContext<ProfileProps>();

  // Load initial values from context.
  React.useEffect(() => {
    setImages(values.photos as string[]);
  }, []);

  const _takePhoto = async () => {
    let result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

    console.log(result);

    if (!result.cancelled) {
      const uri = result?.uri;
      const arr = [uri, ...images];
      setImages(arr);
      setFieldValue('photos', arr);
    }
  };

  const _handleCreate = async () => {
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      console.log('USER', { userData, userError });
      const userId = userData.user?.id;
      const profile = { id: userId, ...values };
      const { data, error } = await supabase.rpc('create_new_profile', {
        data: profile,
      });
      // console.log(profile);
      console.log('DATA', { data, error });
      // const { data: profileData, error: profileError } = await supabase
      //   .from('profiles')
      //   .upsert({
      //     id: userId,
      //     first_name: values.firstName,
      //     last_name: values.lastName,
      //     dob: values.dob,
      //   });
      // console.log('PROFILE', { data: profileData, error: profileError });

      // const { data: genderData, error: genderError } = await supabase
      //   .from('genders')
      //   .upsert(
      //     values.gender.gender.map((g) => {
      //       gender: g;
      //     })
      //   );

      // console.log('GENDER', { data: genderData, error: genderError });
    } catch (error) {
      console.log('CATCH', error);
    }
  };

  return (
    <FormPageLayout>
      <FormPageLayout.PageHeader
        title='Upload some selfies'
        description='At least one photo is required, but you can add up to three now or more later.'
      />
      <FormPageLayout.PageContent>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {images.length < 3 && (
            <View
              style={{
                width: `${100 / 3}%`,
                aspectRatio: 1,
                padding: 4,
              }}
            >
              <TouchableOpacity
                onPress={_takePhoto}
                style={{
                  borderRadius: 16,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: theme.colors.text[50],
                }}
              >
                <MaterialCommunityIcons
                  name='plus'
                  size={32}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
          )}

          {images.map((image) => (
            <Thumbnail
              uri={image}
              onDelete={
                () => {
                  const arr = images.filter((img) => img !== image);
                  setImages(arr);
                  setFieldValue('photos', arr);
                }
                //
              }
            />
          ))}
        </View>
      </FormPageLayout.PageContent>

      {/* Footer */}
      <FormPageLayout.PageFooter>
        <ArrowNavigator
          backComponent={{
            disabled: false,
            onPress: () => props.navigation.goBack(),
          }}
          nextComponent={{
            disabled: !!errors.photos || false,
            onPress: _handleCreate,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};
export default PhotoUploadScreen;
