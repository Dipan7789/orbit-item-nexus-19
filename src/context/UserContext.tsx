
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  profileImage: string | null;
  updateProfileImage: (imageUrl: string) => void;
  userName: string;
  userRole: string;
  updateUserDetails: (name: string, role: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load user data from localStorage on initial load
  const [profileImage, setProfileImage] = useState<string | null>(
    localStorage.getItem('userProfileImage') || null
  );
  const [userName, setUserName] = useState<string>(
    localStorage.getItem('userName') || 'Astronaut User'
  );
  const [userRole, setUserRole] = useState<string>(
    localStorage.getItem('userRole') || 'Mission Specialist'
  );
  
  const updateProfileImage = (imageUrl: string) => {
    setProfileImage(imageUrl);
    localStorage.setItem('userProfileImage', imageUrl);
  };

  const updateUserDetails = (name: string, role: string) => {
    setUserName(name);
    setUserRole(role);
    localStorage.setItem('userName', name);
    localStorage.setItem('userRole', role);
  };
  
  // Persist updated data to localStorage whenever it changes
  useEffect(() => {
    if (profileImage) {
      localStorage.setItem('userProfileImage', profileImage);
    } else {
      localStorage.removeItem('userProfileImage');
    }
  }, [profileImage]);

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  return (
    <UserContext.Provider value={{ 
      profileImage, 
      updateProfileImage, 
      userName, 
      userRole,
      updateUserDetails
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;
