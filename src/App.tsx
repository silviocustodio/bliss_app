import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { SideMenu } from './shared/components';
import {
  AppThemeProvider,
  CheckServerProvider,
  DrawerProvider,
} from './shared/contexts';
import { LightTheme } from './shared/themes';

export const App = () => {
  return (
    <CheckServerProvider>
      <AppThemeProvider>
        <DrawerProvider>
          <BrowserRouter>
            <SideMenu>
              <AppRoutes />
            </SideMenu>
          </BrowserRouter>
        </DrawerProvider>
      </AppThemeProvider>
    </CheckServerProvider>
  );
};
