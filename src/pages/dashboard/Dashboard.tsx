import { Box, Button, Icon, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BaseLayoutPage } from '../../shared/layout';

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <BaseLayoutPage title="Welcome to the Questions list project ">
      <Box marginX={1} padding={1} display="flex" gap={1} alignItems="center">
        <Typography> </Typography>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => navigate('/questions')}
          startIcon={<Icon>quiz</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            See questions
          </Typography>
        </Button>
      </Box>
    </BaseLayoutPage>
  );
};
