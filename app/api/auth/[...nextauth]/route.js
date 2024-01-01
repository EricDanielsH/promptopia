// api/auth/[...nextauth] is the current best practice
// this route handles authentication process
// documentation: https://next-auth.js.org/getting-started/example

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";

// console.log(
//   process.env.GOOGLE_ID,
//   process.env.GOOGLE_CLIENT_SECRET
// )

// This handler needs a providers[], and callbacks[] (async session(), async signIn()
const handler = NextAuth({
  providers: [
    GoogleProvider({
      // Use .env to get ids
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // we want to get the data to keep an existing and running session
      // This has to be awaited, if not, findOne returns a promise.
      // This is becasue findOne is an async function
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      // Check if the user was found and has an _id property
      // if (sessionUser && sessionUser._id) {
      // Update the ID
      session.user.id = sessionUser._id.toString();
      // } else {
      // console.error("User not found or missing _id property");
      // You may want to log this error or handle it in some way.
      // }

      return session;
    },
    async signIn({ profile }) {
      try {
        // serverless -> Lambda
        await connectToDB();

        // check if user already exits
        const userExists = await User.findOne({
          email: profile.email,
        });

        // else, create new user and save to db
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(), // Convert username to no spaces and lower case
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
