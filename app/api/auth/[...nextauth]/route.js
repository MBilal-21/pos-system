import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        try {
          const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
            credentials.email,
          ]);

          if (rows.length === 0) throw new Error("User not found");

          const user = rows[0];

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) throw new Error("Invalid password");

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          throw new Error("Login failed: " + error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import pool from "@/lib/db";
// // This would typically come from a database
// const users = [
//   {
//     id: "1",
//     username: "admin",
//     password: "password",
//     name: "Admin User",
//     role: "admin",
//   },
//   {
//     id: "2",
//     username: "cashier",
//     password: "password",
//     name: "Cashier User",
//     role: "cashier",
//   },
// ]

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//         role: { label: "Role", type: "text" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.username || !credentials?.password || !credentials?.role) {
//           return null
//         }

//         // In a real application, you would check against your database
//         const user = users.find(
//           (user) =>
//             user.username === credentials.username &&
//             user.password === credentials.password &&
//             (credentials.role === "any" || user.role === credentials.role)
//         )

//         if (!user) {
//           return null
//         }

//         return {
//           id: user.id,
//           name: user.name,
//           username: user.username,
//           role: user.role,
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role
//         token.username = user.username
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.role = token.role
//         session.user.username = token.username
//       }
//       return session
//     },
//   },
//   pages: {
//     signIn: "/",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }