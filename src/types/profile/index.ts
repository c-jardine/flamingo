export type ProfileProps = {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: { gender: string | null; identities: string[] };
  pronouns: string[];
  sexualOrientation: string[];
  personalityType: string;
};
