import { useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import Gify from './components/Gify';
import { ColorModeContext } from './Context';

import './App.css';

function App() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  });



  // function to set theme mode
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          localStorage.setItem('theme', prevMode === 'light' ? 'dark' : 'light')
          return prevMode === 'light' ? 'dark' : 'light'
        });

      },
    }),
    [],
  );



  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark' && {
            background: {
              default: '#0A1929'
            }
          })
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={{ colorMode, mode }}>
      <ThemeProvider theme={theme}>
        <Box className="App"
          sx={{
            bgcolor: 'background.default',
            color: 'text.primary',
          }}>
          <Gify />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;