import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { split } from "postcss/lib/list";
import bycrypt from "bcryptjs";
import { NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongoDB();

        const userFound = await User.findOne({
          username: credentials.username,
        }).select("+password");

        if (!userFound) {
          throw new Error("User not found");
        }
        const passwordMatch = await bycrypt.compare(
          credentials.password,
          userFound.password
        );
        if (!passwordMatch) {
          throw new Error("Password not match or User not found");
        }

        return userFound;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        const sessionUser = await User.findOne({ email: user.email });
        if (!sessionUser) return;
        token.user._id = sessionUser._id;
        token.user.name = sessionUser.name;
        token.user.lastname = sessionUser.lastname;
        token.user.username = sessionUser.username;
        token.user.photoFav = sessionUser.photoFav;
        token.user.isAdmin = sessionUser.isAdmin;
        token.user.createdAt = sessionUser.createdAt;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async signIn({ profile, credentials }) {
      try {
        await connectMongoDB();
        const usernameExists = await User.findOne({
          username: credentials?.username,
        }).select("+username");
        const userExists = await User.find({
          $or: [{ email: profile?.email }, { username: credentials?.username }],
        });

        if (usernameExists && usernameExists.length > 0) {
          return NextResponse.json(
            { message: "Username is in use" },
            { status: 400 }
          );
        }

        if (userExists && userExists.length > 0) {
          return NextResponse.json(
            { message: "Email is in use" },
            { status: 400 }
          );
        }
        if (!userExists || profile?.email_verified) {
          const usernameProvider =
            split(profile?.given_name, " ") + Math.floor(Math.random() * 1000);
          const splitUsername = usernameProvider.split(",");
          const joinUsername = splitUsername.join("");

          const userpassword =
            profile?.given_name + Math.floor(Math.random() * 1000000000);
          const salt = await bycrypt.genSalt(12);
          const passwordEncryted = await bycrypt.hash(userpassword, salt);
          const profilePassword = passwordEncryted;
          await User.create({
            username: joinUsername,
            email: profile?.email,
            name: profile?.given_name,
            lastname: profile?.family_name,
            password: profilePassword,
            image: profile?.picture,
          });
        }
        
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
  authorized({ req, token }) {
    if (token) return true; // If there is a token, the user is authenticated
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
});

export { handler as GET, handler as POST };
