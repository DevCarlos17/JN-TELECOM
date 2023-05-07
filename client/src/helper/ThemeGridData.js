import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, bgBG } from '@mui/x-data-grid';
//import { bgBG as pickersBgBG } from '@mui/x-date-pickers/locales';
//import { bgBG as coreBgBG } from '@mui/material/locale';

export const themeGridData = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  //bgBG, // x-data-grid translations
  //pickersBgBG, // x-date-pickers translations
  //coreBgBG, // core translations
);


