import {
  AnalyzeIDCommand,
  AnalyzeIDCommandInput,
  TextractClient,
} from '@aws-sdk/client-textract';
import { Buffer } from 'buffer';
import { CameraCapturedPicture } from 'expo-camera';
import Constants from 'expo-constants';
import React from 'react';
import { Image } from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, SettingsMenuEnum } from '../../../components/camera';
import { IdBoundingBox } from '../../../components/camera/BoundingBox';
import { ArrowNavigator, Toast } from '../../../components/common';
import { FormPageLayout } from '../../../components/layouts';
import { ThemeContext } from '../../../providers';
import { setLoading } from '../../../redux/slices/appSlice';
import { setIdImage } from '../../../redux/slices/verificationSlice';
import { RootState } from '../../../redux/store';
import { IdRequiredFields, IdType } from '../../../shared/constants/IdScanner';
import { IdVerificationScreenNavigationProp } from './IdVerificationScreen.types';

const accessKeyId = Constants?.manifest?.extra?.awsAccessKeyId as string;
const secretKey = Constants?.manifest?.extra?.awsSecretAccessKey as string;

const IdVerificationScreen = (props: {
  navigation: IdVerificationScreenNavigationProp;
}) => {
  const { theme } = React.useContext(ThemeContext);
  const [image, setImage] = React.useState<CameraCapturedPicture | null>(null);

  const [isValid, setIsValid] = React.useState<boolean>(false);

  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.appReducer.loading);

  const _scan = async (): Promise<void> => {
    try {
      dispatch(setLoading(true));

      const textractClient = new TextractClient({
        region: 'us-east-2',
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretKey,
        },
      });

      const result = image?.base64 as string;
      const b = Buffer.from(result, 'base64');

      const input = {
        DocumentPages: [{ Bytes: b }],
      } as AnalyzeIDCommandInput;

      const command = new AnalyzeIDCommand(input);
      const res = await textractClient.send(command);
      const fields =
        (res?.IdentityDocuments &&
          res.IdentityDocuments[0].IdentityDocumentFields) ||
        [];

      for (let i = 0; i < fields?.length; i++) {
        const fieldType = fields[i]?.Type?.Text || '';
        const valueConfidence = fields[i]?.ValueDetection?.Confidence || 0;
        const value = fields[i]?.ValueDetection?.Text || '';

        if (IdRequiredFields.includes(fieldType)) {
          if (value !== '' && valueConfidence > 90) {
            setIsValid(true);
            if (fieldType === 'ID_TYPE' && !IdType.includes(value)) {
              dispatch(setLoading(false));

              setIsValid(false);
              setImage(null);
              console.log(
                `BAD ID TYPE - FIELD: ${fieldType} | VALUE: ${value}`
              );
              Toast.error('Unable to locate document.');
              return;
            }
          } else {
            console.log(
              `EMPTY OR LOW CONFIDENCE - FIELD: ${fieldType} | VALUE: ${value}`
            );
            dispatch(setLoading(false));

            setIsValid(false);
            setImage(null);
            Toast.error(`Unable to located field: ${fieldType}`);
            return;
          }
          dispatch(setIdImage(result));
        }
      }
      dispatch(setLoading(false));

      Toast.success('Success! Continue to the next page.');
    } catch (error) {
      dispatch(setLoading(false));

      setImage(null);
      console.log(error);
    }
  };

  return (
    <FormPageLayout>
      <FormPageLayout.PageHeader
        title='Identity verification'
        description="To keep Flamingo users safe, we require users to verify their identity
          with a state ID or driver's license. Don't worry, it won't be stored."
      />

      <FormPageLayout.PageContent>
        <Animated.View
          entering={ZoomIn.duration(200)}
          exiting={ZoomOut.duration(200)}
        >
          {!isValid ? (
            <Camera
              image={image}
              setImage={setImage}
              boundingBox={IdBoundingBox}
              settings={[
                SettingsMenuEnum.FlashToggle,
                SettingsMenuEnum.AutoFocusToggle,
                SettingsMenuEnum.BoundingBoxToggle,
              ]}
              onSubmit={_scan}
            />
          ) : (
            <Image
              source={{ uri: image?.uri }}
              style={{
                width: '100%',
                aspectRatio: 1,
                marginTop: theme.spacing.xxl,
              }}
            />
          )}
        </Animated.View>
      </FormPageLayout.PageContent>

      {/* Footer */}
      <FormPageLayout.PageFooter>
        <ArrowNavigator
          backComponent={{
            disabled: false,
            onPress: () => props.navigation.goBack(),
          }}
          nextComponent={{
            onPress: () => props.navigation.navigate('PhotoVerification'),
            disabled: !image || !isValid,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};

export default IdVerificationScreen;
