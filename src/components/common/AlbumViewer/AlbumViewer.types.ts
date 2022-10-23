import React from 'react';

type AlbumViewerProps = {
  albumId: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  initialPhoto: any;
};

export default AlbumViewerProps;
