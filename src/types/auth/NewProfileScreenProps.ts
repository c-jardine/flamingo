import React from 'react';
import { NewProfileScreenEnum } from '../../enums/NewProfileScreenEnum';

export interface NewProfileScreenNavigatorProps {
  navigator: React.Dispatch<React.SetStateAction<NewProfileScreenEnum>>;
}
