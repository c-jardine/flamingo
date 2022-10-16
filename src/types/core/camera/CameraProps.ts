import React from 'react';
import { CameraSetting } from '../../../enums/CameraSetting';

export type CameraProps = {
  boundingBox: React.ComponentType;
  settings: CameraSetting[];
  onSubmit: () => void;
};
