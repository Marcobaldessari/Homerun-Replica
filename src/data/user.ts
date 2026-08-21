export interface MockUser {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
}

// Static prototype data for the signed-in consumer. Not meant to be edited
// at runtime — there is no real auth/profile data model in this repo yet.
export const mockUser: MockUser = {
  name: "Mara Marozzi",
  email: "mara.marazzi@gmail.com",
  phone: "+39 349463378",
  location: "Milan, Milan, Milan",
  avatarUrl: "/avatars/MaraMarozzi.png",
};
