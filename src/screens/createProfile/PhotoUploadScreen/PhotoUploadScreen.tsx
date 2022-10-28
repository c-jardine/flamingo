import { MaterialCommunityIcons } from '@expo/vector-icons';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useFormikContext } from 'formik';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowNavigator, Thumbnail } from '../../../components/common';
import { FormPageLayout } from '../../../components/layouts';
import { AuthContext, ThemeContext } from '../../../providers';
import { setLoading } from '../../../redux/slices/appSlice';
import { RootState } from '../../../redux/store';
import { ProfileProps } from '../../../shared/types';
import { supabase } from '../../../supabase';
import { PhotoUploadScreenProps } from './PhotoUploadScreen.types';

const PhotoUploadScreen = (props: PhotoUploadScreenProps) => {
  const { theme } = React.useContext(ThemeContext);
  const [images, setImages] = React.useState<string[]>([]);

  const { values, errors, setFieldValue } = useFormikContext<ProfileProps>();

  const dispatch = useDispatch();

  const { setProfile } = React.useContext(AuthContext);

  // Load initial values from context.
  React.useEffect(() => {
    setImages(values.photos as string[]);
  }, []);

  const _takePhoto = async () => {
    let result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 1,
      });

    if (!result.cancelled) {
      const uri = result?.uri;
      const arr = [uri, ...images];
      setImages(arr);
      setFieldValue('photos', arr);
    }
  };

  const _handleCreate = async () => {
    dispatch(setLoading(true));
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      // console.log('USER', { userData, userError });
      const userId = userData.user?.id;
      const profile = {
        ...values,
        id: userId,
        gender: {
          gender: values.gender.gender[0],
          identities: values.gender.identities,
        },
        pronouns: values.pronouns,
        sexualOrientation: values.sexualOrientation,
        personalityType: [values.personalityType],
      };

      const { data, error } = await supabase.rpc('create_new_profile', {
        data: profile,
      });

      values.photos?.map(async (img) => {
        const manipulatedResult = await manipulateAsync(
          img,
          [{ resize: { width: 1200 } }],
          { compress: 0.5, format: SaveFormat.JPEG }
        );

        const filename = `${userId}/${manipulatedResult.uri.replace(
          /^.*[\\\/]/,
          ''
        )}`;
        const supabaseUrl = `${userId}/${filename}`;
        const formData = new FormData();
        const blob = {
          uri: manipulatedResult.uri,
          name: filename,
          type: 'image/jpeg',
        };
        formData.append('files', blob as any);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('albums')
          .upload(supabaseUrl, formData, {
            cacheControl: '3600',
            upsert: false,
          });

        console.log('PHOTO', { uploadData, uploadError });
      });
    } catch (error) {
      console.log('CATCH', error);
    }
    dispatch(setLoading(false));
  };

  return (
    <>
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
                key={image}
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
    </>
  );
};
export default PhotoUploadScreen;
