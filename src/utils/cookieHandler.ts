import { cookies } from "next/headers";

// Function to set a cookie
export const setCookie = (name: string, value: string, maxAge: number) => {
  const cookieStore = cookies();
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_ENVIRONMENT === "prod", // Secure only in production
    maxAge,
    path: "/",
  });
};

// Function to get a cookie
export const getCookie = (name: string) => {
  const cookieStore = cookies();

  return cookieStore.get(name)?.value || null;
};

// Function to remove a cookie
export const removeCookie = (name: string) => {
  const cookieStore = cookies();
  cookieStore.set(name, "", {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_ENVIRONMENT === "prod",
    maxAge: -1, // Expire immediately
    path: "/",
  });
};
