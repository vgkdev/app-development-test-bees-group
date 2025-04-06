// src/context/ThemeContext.tsx
import { createContext, useState, ReactNode, useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Tạo theme dựa trên chế độ dark/light
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          ...(darkMode
            ? {
                // Cấu hình palette cho dark mode
                background: {
                  default: "#121212", // Màu nền tối tiêu chuẩn
                  paper: "#1e1e1e", // Màu cho các component như Paper, Card
                },
                text: {
                  primary: "#ffffff", // Màu chữ chính
                  secondary: "rgba(255, 255, 255, 0.7)", // Màu chữ phụ
                },
              }
            : {
                // Cấu hình palette cho light mode
              }),
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline /> {/* Quan trọng: Áp dụng styles nền */}
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
