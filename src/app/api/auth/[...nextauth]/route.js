'use server'
import NextAuth from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';
import LinkedInProvider from 'next-auth/providers/linkedin';
import User from '@/models/User';
import connectDB from '@/db/connectDB';

export const authoptions = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            scope: 'read:user user:email'
        }),
               
    ],



    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider === "github") {
                await connectDB();

                try {
                    // console.log("user", user, "account", account, "profile", profile, "email", email, "credentials", credentials);

                    const currentUser = await User.findOne({ email: user.email });
                    // console.log("currentUser", currentUser)

                    if (currentUser) {
                        // console.log("Signing In as ", currentUser)
                        return true;
                    }

                    if (!currentUser) {
                        const newUser = await User.create({
                            providerId: user.id,
                            email: user.email,
                            name: user.name,
                            username: profile.login,
                            profilePic: user.image,
                            provider: account.provider
                        });
                        // console.log("new user", newUser);
                    }
                    return true;
                } catch (error) {
                    console.error("Error in Github signIn callback:", error);
                    return false;
                }
            }

            
            return true;
        },
        async session({ session, user, token }) {
            await connectDB();
            // console.log("session", session)
            // console.log("user", user)
            // console.log("token", token)

            try {
                const dbUser = await User.findOne({ email: session.user.email });
                // console.log("dbUser", dbUser)

                if (!dbUser) {
                    console.error("User not found in session callback");
                    return session;
                }

                session.user.username = dbUser.username

                // console.log("found in sesson :", session)
                return session;
            } catch (error) {
                console.error("Error in session callback:", error);
                return session; // Return the session even if there's an error
            }
        }
    }
});

export { authoptions as GET, authoptions as POST };
