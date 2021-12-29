import React, {createContext, useContext} from "react";
import {useMediaQuery} from "react-responsive";

const MediaQueryContext = createContext({
  is_mobile: false
});

export const MediaQueryProvider: React.FC = ({children}) => {
  const is_mobile = useMediaQuery({
    query: '(max-width: 500px)'
  });
  return (
    <MediaQueryContext.Provider
      value={
        {is_mobile: is_mobile}
      }
    >
      {children}
    </MediaQueryContext.Provider>
  );
};

export const useIsMobile = () => useContext(MediaQueryContext);
