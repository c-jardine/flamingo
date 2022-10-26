export type ProfileProps = {
  id?: string;
  firstName: string;
  lastName?: string;
  dob: Date;
  gender: {
    gender: string[];
    identities: string[];
  };
  pronouns?: string[];
  sexualOrientation?: string[];
  personalityType?: string[];
  location?: any;
  avatarSrc?: string;
  photos?: string[];
};
