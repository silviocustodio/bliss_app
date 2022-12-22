import { Box, width } from '@mui/system';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useDrawerContext } from '../../contexts';

import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';

interface ISideMenuProps {
  children: React.ReactNode;
}
export const SideMenu: React.FC<ISideMenuProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

  interface IListItemLinkProps {
    to: string;
    icon: string;
    label: string;
    onClick: (() => void) | undefined;
    // children: React.ReactNode;
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
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{
                height: theme.spacing(12),
                width: theme.spacing(12),
              }}
              src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png"
            />
          </Box>
          <Divider />

          <Box flex={1}>
            <List component="nav">
              <ListItemLink
                icon="home"
                to="/home"
                label="Home page"
                onClick={smDown ? toggleDrawerOpen : undefined}
              />
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
// import {
//   Avatar,
//   Divider,
//   Drawer,
//   Icon,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';

// import { Box, width } from '@mui/system';
// interface ISideMenuProps {
//   children: React.ReactNode;
// }
// export const SideMenu: React.FC<ISideMenuProps> = ({ children }) => {
//   const theme = useTheme();
//   const smDown = useMediaQuery(theme.breakpoints.down('sm'));
//   return (
//     <>
//       <Drawer open={true} variant={smDown ? 'temporary' : 'permanent'}>
//         <Box
//           width={theme.spacing(28)}
//           height="100%"
//           display="flex"
//           flexDirection="column"
//         >
//           <Box
//             width="100%"
//             height={theme.spacing(20)}
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//           >
//             <Avatar
//               sx={{
//                 height: theme.spacing(12),
//                 width: theme.spacing(12),
//               }}
//               src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png"
//             />
//           </Box>
//           <Divider />
//           <Box flex={1}>
//             <List component="nav">
//               {/* <ListItemLink
//                 icon="home"
//                 to="/start-page"
//                 label="Home page"
//                 onClick={smDown ? toggleDrawerOpen : undefined}
//               /> */}
//               <ListItemButton>
//                 <ListItemIcon>
//                   <Icon>home</Icon>
//                 </ListItemIcon>
//                 <ListItemText primary="Home" />
//               </ListItemButton>
//             </List>
//           </Box>
//         </Box>
//       </Drawer>
//       ;
//       <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
//         {children}
//       </Box>
//     </>
//   );
// };
