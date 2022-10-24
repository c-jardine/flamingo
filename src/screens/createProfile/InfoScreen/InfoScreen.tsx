import React from 'react';
import { Image, View } from 'react-native';
import Animated, { BounceIn, BounceOut, FadeIn } from 'react-native-reanimated';
import idGraphic from '../../../../assets/images/id-graphic.png';
import { IdBoundingBox } from '../../../components/camera';
import { ArrowNavigator } from '../../../components/common';
import { FormPageLayout } from '../../../components/layouts';
import { ThemeContext } from '../../../providers';
import { signOut } from '../../../shared/services';
import { InfoScreenNavigationProp } from './InfoScreen.type';

const InfoScreen = (props: { navigation: InfoScreenNavigationProp }) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <FormPageLayout>
      <FormPageLayout.PageHeader
        title='Set up your profile'
        description='Before using Flamingo, you need to validate your identity and finish setting up your profile. Click the next button to get started.'
      />

      <FormPageLayout.PageContent>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Animated.View
            entering={FadeIn.duration(500).delay(1000)}
            exiting={BounceOut.duration(500)}
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          >
            <IdBoundingBox />
          </Animated.View>
          <Animated.View
            entering={BounceIn.duration(500).delay(1000)}
            exiting={BounceOut.duration(500)}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              padding: 64,
            }}
          >
            <Image
              source={idGraphic}
              style={{
                height: '100%',
                width: '100%',
                resizeMode: 'contain',
              }}
            />
          </Animated.View>
        </View>
      </FormPageLayout.PageContent>

      {/* Footer */}
      <FormPageLayout.PageFooter>
        <ArrowNavigator
          backComponent={{
            icon: 'close-thick',
            disabled: false,
            onPress: () => signOut(),
          }}
          nextComponent={{
            onPress: () => props.navigation.navigate('IdVerification'),
            // disabled: !!errors?.email || !!errors?.password || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};
export default InfoScreen;
