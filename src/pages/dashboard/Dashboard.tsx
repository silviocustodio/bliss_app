import { Box, Button, Icon, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToolsDetails } from '../../shared/components/tools-details/ToolsDetails';
import { BaseLayoutPage } from '../../shared/layout';

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <BaseLayoutPage
      title="Welcome to the Questions list project "
      //   navBar={<ToolsList showSearchInput={false} showBackListQuestions />}
      // navBar={<ToolsDetails />}
    >
      <Box
        // height={theme.spacing(5)}
        marginX={1}
        padding={1}
        display="flex"
        // component={Paper}
        gap={1}
        alignItems="center"
      >
        <Typography> </Typography>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          // onClick={onClickInDismiss}
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
