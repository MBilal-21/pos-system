import { useSession, signOut } from "next-auth/react";

export const getUser = () => {
  const { data: session } = useSession();
  return session?.user || null;
};

export const isAuthenticated = () => {
  const { data: session } = useSession();
  return !!session;
};

export const isAdmin = () => {
  const { data: session } = useSession();
  return session?.user?.role === "admin";
};

export const logout = () => {
  signOut({ callbackUrl: "/" });
};


// export const getUser = () => {
//     const userJson = localStorage.getItem('user');
//     if (!userJson) return null;
    
//     try {
//       return JSON.parse(userJson);
//     } catch (error) {
//       return null;
//     }
//   };
  
//   export const isAuthenticated = () => {
//     const user = getUser();
//     return !!user?.loggedIn;
//   };
  
//   export const isAdmin = () => {
//     const user = getUser();
//     return user?.role === 'admin';
//   };
  
//   export const logout = () => {
//     localStorage.removeItem('user');
//     window.location.href = '/';
//   };
  