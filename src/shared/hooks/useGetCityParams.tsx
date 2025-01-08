
import React, { createContext, useContext, ReactNode } from 'react';

interface CityContextProps {
  City: string;
}

const CityContext = createContext<CityContextProps | undefined>(undefined);

export const CityProvider: React.FC<{ City: string; children: ReactNode }> = ({ City, children }) => {
  return (
    <CityContext.Provider value={{ City }}>
      {children}
    </CityContext.Provider>
  );
};

export const useGetCityParams = () => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useGetCityParams must be used within a CityProvider');
  }
  return context.City;
};
