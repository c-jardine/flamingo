import { SetStateAction } from 'react';
import { AuthScreensEnum } from '../../enums/AuthScreenEnum';

export interface AuthScreenNavigatorProps {
  navigator: React.Dispatch<SetStateAction<AuthScreensEnum>>;
}
