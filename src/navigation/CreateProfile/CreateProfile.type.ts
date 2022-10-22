export type CreateProfileParams = {
  Info: undefined;
  PersonalInfo: undefined;
  Birthdate: undefined;
  Gender: undefined;
  Pronouns: undefined;
  SexualOrientation: undefined;
  PersonalityType: undefined;
};

export type CreateProfileProps = {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: { gender: string | null; identities: string[] };
};
