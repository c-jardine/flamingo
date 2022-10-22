import React from 'react';

export enum AuthScreenEnum {
  SIGN_IN_SCREEN,
  SIGN_UP_SCREEN,
  EMAIL_VERIFICATION_SCREEN,
  VERIFY_IDENTITY_SCREEN,
  FORGOT_PASSWORD_SCREEN,
}

export interface AuthScreenNavigatorProps {
  navigator: React.Dispatch<React.SetStateAction<AuthScreenEnum>>;
}
