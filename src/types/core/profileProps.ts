export type ProfileProps = {
  id?: string;
  is_online?: boolean;
  updated_at?: Date;
  first_name: string;
  last_name: string;
  dob: Date;
  gender: 'Man' | 'Woman' | 'Nonbinary' | '';
  location: string;
  avatar_src?: string;
  last_online?: Date;
};
