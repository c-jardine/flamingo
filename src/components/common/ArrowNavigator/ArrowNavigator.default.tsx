import React from 'react';
import { ThemeContext } from '../../../providers';
import { IconButton } from '../IconButton';
import { defaultContentContainerStyle } from './ArrowNavigator.styles';
import { ArrowNavigatorProps } from './ArrowNavigator.type';

/**
 * Helper function that initializes default values for props that aren't
 * provided.
 * @param {ArrowNavigatorProps} props The props passed to the ArrowNavigator
 * component.
 * @returns {ArrowNavigatorProps} A props object to be used in the
 * ArrowNavigator in place of directly using its props parameter.
 */
export const arrowNavigatorDefaults = (
  props: ArrowNavigatorProps
): ArrowNavigatorProps => {
  const { theme } = React.useContext(ThemeContext);

  const { contentContainerStyle } = props;
  const { backComponent } = props;
  const { nextComponent } = props;

  // Default back button render
  const _backButton = (): JSX.Element => {
    return (
      <IconButton
        iconProps={{
          name:
            backComponent?.icon !== undefined
              ? backComponent.icon
              : 'arrow-left-thick',

          disabled:
            backComponent?.disabled !== undefined
              ? backComponent?.disabled
              : false,
        }}
        contentContainerStyle={{
          backgroundColor: theme.colors.text['50'],
        }}
        contentContainerProps={{
          onPress:
            backComponent?.onPress !== undefined
              ? backComponent?.onPress
              : () => {
                  return;
                },
        }}
      />
    );
  };

  // Default next button render
  const _nextButton = (): JSX.Element => {
    return (
      <IconButton
        iconProps={{
          name:
            nextComponent?.icon !== undefined
              ? nextComponent.icon
              : 'arrow-right-thick',

          disabled:
            nextComponent?.disabled !== undefined
              ? nextComponent?.disabled
              : false,
        }}
        contentContainerStyle={{
          backgroundColor: nextComponent?.disabled
            ? theme.colors.text['50']
            : theme.colors.primary,
        }}
        contentContainerProps={{
          onPress:
            nextComponent?.onPress !== undefined
              ? nextComponent?.onPress
              : () => {
                  return;
                },
        }}
      />
    );
  };

  // Initialize prop defaults where necessary.
  const initProps: ArrowNavigatorProps = {
    contentContainerStyle:
      contentContainerStyle !== undefined
        ? contentContainerStyle
        : defaultContentContainerStyle(props),

    backComponent: {
      disabled:
        backComponent?.disabled !== undefined ? backComponent?.disabled : true,
      visible:
        backComponent?.visible !== undefined ? backComponent?.visible : true,
      icon:
        backComponent?.icon !== undefined ? backComponent?.icon : 'arrow-left',
      render:
        backComponent?.render !== undefined
          ? backComponent?.render
          : _backButton(),
    },

    nextComponent: {
      disabled: nextComponent?.disabled || false,
      visible: nextComponent?.visible || true,
      icon: nextComponent?.icon || 'arrow-left',
      render: nextComponent?.render || _nextButton(),
    },
  };

  return initProps;
};
