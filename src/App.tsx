// src/App.tsx
import { ThemeProvider } from "./context/ThemeContext";
import UserManagement from "./pages/UserManagement";

const App = () => (
  <ThemeProvider>
    <UserManagement />
  </ThemeProvider>
);

export default App;
