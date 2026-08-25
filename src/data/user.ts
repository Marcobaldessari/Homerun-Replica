export type ContactPreference = "call" | "message-only";

export interface UserAddress {
  city: string;
  district: string;
  neighborhood: string;
}

export interface MockUser {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  location: string;
  address: UserAddress;
  callPreference: ContactPreference;
  avatarUrl: string;
}

// Static prototype data for the signed-in consumer. Not meant to be edited
// at runtime — there is no real auth/profile data model in this repo yet.
// Settings screens hold their own copy of this in local state instead.
export const mockUser: MockUser = {
  name: "Mara Marozzi",
  email: "mara.marazzi@gmail.com",
  countryCode: "+39",
  phone: "349463378",
  location: "Milan, Milan, Milan",
  address: { city: "Milan", district: "Milan", neighborhood: "Milan" },
  callPreference: "call",
  avatarUrl: "/avatars/MaraMarozzi.png",
};

// Numbers already registered to another account, for exercising the
// "already used" error state on the phone-number settings screen.
export const PHONE_NUMBERS_IN_USE = ["3491112222"];
