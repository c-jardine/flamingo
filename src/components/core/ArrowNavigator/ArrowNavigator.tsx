import React from 'react';
import { View } from 'react-native';
import { arrowNavigatorDefaults } from './ArrowNavigator.default';
import { ArrowNavigatorProps } from './ArrowNavigator.type';

/**
 * The ArrowNavigator component is a simple navigator, featuring two buttons
 * to move between screens.
 * @param {ArrowNavigatorProps} props The props to apply the the ArrowNavigator component.
 * @returns {JSX.Element} Returns the ArrowNavigator component.
 */
const ArrowNavigator = (props: ArrowNavigatorProps): JSX.Element => {
  // Set necessary default props if they aren't provided.
  const _props: ArrowNavigatorProps = arrowNavigatorDefaults(props);
  React.useEffect(() => {
    console.log(_props);
  });

  return (
    <View style={_props.contentContainerStyle}>
      {/* Back button */}
      {_props.backComponent?.visible && (
        <View>{_props.backComponent?.render}</View>
      )}

      {/* Next button */}
      {_props.nextComponent?.visible && (
        <View>{_props.nextComponent?.render}</View>
      )}
    </View>
  );
};

export default ArrowNavigator;
