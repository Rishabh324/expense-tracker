import { createContext, useContext, useEffect, useState } from "react";

const ScreenContext = createContext({});

export const ScreenProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 748);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount and cleans up on unmount

  useEffect(() => {
    setSidebarOpen(false);
  }, [isMobile]); // Reset sidebarOpen when isMobile changes

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); // Use functional update for state toggles
  };

  // Ensure initial state of isMobile is set correctly on mount
  useEffect(() => {
    handleResize();
  }, []);

  return (
    <ScreenContext.Provider value={{ isMobile, sidebarOpen, toggleSidebar }}>
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreen = () => useContext(ScreenContext);
