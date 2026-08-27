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
  hasPassword: boolean;
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
  hasPassword: true,
};

// Numbers already registered to another account, for exercising the
// "already used" error state on the phone-number settings screen.
export const PHONE_NUMBERS_IN_USE = ["3491112222"];

// The mock user's current password, for exercising the "wrong password"
// error state on the change-password screen — there's no real auth backend
// in this repo to check it against.
export const MOCK_CURRENT_PASSWORD = "password123";

// Typing this as the new password exercises the "update failed" error toast
// on the change-password screen, since there's no real backend that could
// otherwise fail the save.
export const MOCK_PASSWORD_UPDATE_FAILURE_TRIGGER = "servererror";
