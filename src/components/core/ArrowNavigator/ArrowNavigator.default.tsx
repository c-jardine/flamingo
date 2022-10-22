import React from 'react';
import { ThemeContext } from '../../../provider/ThemeProvider';
import IconButton from '../IconButton';
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
        name={
          backComponent?.icon !== undefined
            ? backComponent.icon
            : 'arrow-left-thick'
        }
        onPress={
          backComponent?.onPress !== undefined
            ? backComponent?.onPress
            : () => {
                return;
              }
        }
        disabled={
          backComponent?.disabled !== undefined
            ? backComponent?.disabled
            : false
        }
        contentContainerStyle={{ backgroundColor: theme.colors.text['50'] }}
      />
    );
  };

  // Default next button render
  const _nextButton = (): JSX.Element => {
    return (
      <IconButton
        name={nextComponent?.icon || 'arrow-right-thick'}
        onPress={
          nextComponent?.onPress ||
          (() => {
            return;
          })
        }
        disabled={nextComponent?.disabled || false}
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
