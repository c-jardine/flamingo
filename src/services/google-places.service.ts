import axios from 'axios';
import Constants from 'expo-constants';

const baseUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
const key = Constants?.manifest?.extra?.googlePlacesApiKey as string;

export const handleLocationAutocomplete = async (input: string) => {
  const res = await axios({
    method: 'GET',
    url: `${baseUrl}`,
    params: { input, key },
  });

  return res.data.predictions;
};
