import React from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
  const [location, setLocation] =
    React.useState<Location.LocationObject | null>(null);
  const [error, setError] = React.useState<{ message: string } | null>(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError({ message: 'Permission to access location was denied.' });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return [location, error];
};

export default useLocation;
