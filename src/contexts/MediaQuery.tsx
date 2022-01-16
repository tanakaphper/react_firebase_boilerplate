import React, {createContext, useContext} from "react";
import {useMediaQuery} from "react-responsive";

const MediaQueryContext = createContext({
  isMobile: false
});

export const MediaQueryProvider: React.FC = ({children}) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 500px)'
  });
  return (
    <MediaQueryContext.Provider
      value={
        {isMobile: isMobile}
      }
    >
      {children}
    </MediaQueryContext.Provider>
  );
};

export const useIsMobile = () => useContext(MediaQueryContext);
