import { Box } from '@mui/system';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useAppThemeContext, useDrawerContext } from '../../contexts';

import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { GitHub, LinkedIn } from '@mui/icons-material';

interface ISideMenuProps {
  children: React.ReactNode;
}
export const SideMenu: React.FC<ISideMenuProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  interface IListItemLinkProps {
    to: string;
    icon: string;
    label: string;
    onClick: (() => void) | undefined;
  }

  const ListItemLink: React.FC<IListItemLinkProps> = ({
    to,
    icon,
    label,
    onClick,
  }) => {
    const navigate = useNavigate();

    const resolvePath = useResolvedPath(to);

    const match = useMatch({ path: resolvePath.pathname, end: false });

    const handleClick = () => {
      navigate(to);
      onClick?.();
    };

    return (
      <ListItemButton selected={!!match} onClick={handleClick}>
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    );
  };

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(31)}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Avatar
              sx={{
                height: theme.spacing(12),
                width: theme.spacing(12),
              }}
              src="https://avatars.githubusercontent.com/u/16634078?v=4"
            />
            <Box
              width="100%"
              height={theme.spacing(10)}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Typography variant="subtitle2" align="center">
                Silvio Custodio
              </Typography>

              <Box
                width="100%"
                height={theme.spacing(4)}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
                gap={1}
              >
                <LinkedIn
                  color="secondary"
                  onClick={() =>
                    window.open('https://www.linkedin.com/in/silviocustodio/')
                  }
                />
                <GitHub
                  onClick={() =>
                    window.open('https://www.github.com/silviocustodio')
                  }
                />
              </Box>
            </Box>
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Switch theme" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
