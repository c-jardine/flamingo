import {
  AnalyzeIDCommand,
  AnalyzeIDCommandInput,
  TextractClient,
} from '@aws-sdk/client-textract';
import { Buffer } from 'buffer';
import { CameraCapturedPicture } from 'expo-camera';
import Constants from 'expo-constants';
import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { Camera, SettingsMenuEnum } from '../../../components/camera';
import { IdBoundingBox } from '../../../components/camera/BoundingBox';
import { ArrowNavigator, Toast } from '../../../components/common';
import { FormPageLayout } from '../../../components/layouts';
import { ThemeContext } from '../../../providers';
import { IdRequiredFields, IdType } from '../../../shared/constants/IdScanner';
import { IdVerificationScreenNavigationProp } from './IdVerificationScreen.types';

const accessKeyId = Constants?.manifest?.extra?.awsAccessKeyId as string;
const secretKey = Constants?.manifest?.extra?.awsSecretAccessKey as string;

const IdVerificationScreen = (props: {
  navigation: IdVerificationScreenNavigationProp;
}) => {
  const { theme } = React.useContext(ThemeContext);
  const [image, setImage] = React.useState<CameraCapturedPicture | null>(null);
  const [isScanning, setIsScanning] = React.useState<boolean>(false);

  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [imageBuffer, setImageBuffer] = React.useState<Buffer | null>(null);

  const _scan = async (): Promise<void> => {
    try {
      setIsScanning(true);

      const textractClient = new TextractClient({
        region: 'us-east-2',
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretKey,
        },
      });

      const result = image?.base64 as string;
      const b = Buffer.from(result, 'base64');
      // props.setIdImage(b);

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
              setIsScanning(false);
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
            setIsScanning(false);
            setIsValid(false);
            setImage(null);
            Toast.error(`Unable to located field: ${fieldType}`);
            return;
          }
          setImageBuffer(b);
        }
      }
      setIsScanning(false);
      Toast.success('Success! Continue to the next page.');
    } catch (error) {
      setIsScanning(false);
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
        {!isScanning ? (
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
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size='large' color={theme.colors.primary} />
          </View>
        )}
      </FormPageLayout.PageContent>

      {/* Footer */}
      <FormPageLayout.PageFooter>
        <ArrowNavigator
          backComponent={{
            disabled: false,
            onPress: () => props.navigation.goBack(),
          }}
          nextComponent={{
            onPress: () =>
              props.navigation.navigate('PhotoVerification', {
                sourceImage: imageBuffer,
              }),
            disabled: !image || !isValid,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};

export default IdVerificationScreen;
