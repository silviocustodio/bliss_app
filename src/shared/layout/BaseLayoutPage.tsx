import {
  Icon,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { useDrawerContext } from '../contexts';

interface IBaseLayoutPageProps {
  title: string;
  navBar?: ReactNode;
  children: React.ReactNode;
}
export const BaseLayoutPage: React.FC<IBaseLayoutPageProps> = ({
  children,
  title,
  navBar,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();
  const { toggleDrawerOpen } = useDrawerContext();
  return (
    <>
      <Box height="100%" display="flex" flexDirection="column" gap={1}>
        <Box
          display="flex"
          alignItems="center"
          padding={1}
          gap={1}
          height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
        >
          {smDown && (
            <IconButton onClick={toggleDrawerOpen}>
              <Icon>menu</Icon>
            </IconButton>
          )}

          <Typography
            variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {title}
          </Typography>
        </Box>
        {navBar && <Box>{navBar}</Box>}

        <Box flex={1} overflow="auto">
          {children}
        </Box>
      </Box>
    </>
  );
};
