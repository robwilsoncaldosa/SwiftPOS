'use server'

import { cookies } from 'next/headers';
import {   type NextRequest, NextResponse } from 'next/server';

export async function login(formData: FormData) {
  // Retrieve username and password from formData
  const username = formData.get("username");
  const password = formData.get("password");

  // Define valid credentials
  const validCredentials = [
    { username: "adminjannah", password: "SA02" },
    { username: "admincath", password: "SA01" }
  ];

  // Check if the provided credentials match any valid credentials
  const isValid = validCredentials.some(cred => 
    cred.username === username && cred.password === password
  );

  if (!isValid) {
    // If credentials are invalid, redirect to login page
    throw new Error("Invalid credentials");
  }

  // Create a session string (no encryption)

  const name = username  === "adminjannah" ? "Jannah Aleriosa" : username === "admincath" ? "Catherine Ferolin" : null;
  const signature = username === "adminjannah" ? "/adminjannah.png" : username === "admincath" ? "/admincath.jpg" : null;
  const session = JSON.stringify({ name,signature });

  // Set expiration to 10 years in the future
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 10);

  // Save the session in a cookie with a long expiration date
  cookies().set("session", session, { expires, httpOnly: true });
  // Redirect to home page after successful login
}

export async function logout() {
  // Destroy the session by setting the cookie to expire immediately
  cookies().set("session", "", { expires: new Date(0), httpOnly: true });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return JSON.parse(session);
}
