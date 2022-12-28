import { Paper, Box, Button, TextField, useTheme, Icon } from '@mui/material';
import { useState } from 'react';
import { Environment } from '../../environment';
import * as yup from 'yup';
interface IToolsListProps {
  searchText?: string;
  emailText?: string;
  showSearchInput?: boolean;
  showEmailInput?: boolean;
  showEmailInputError?: boolean;
  showBackListQuestions?: boolean;
  validateEmailText?: boolean;

  changeSearchText?: (newText: string) => void;
  changeEmailText?: (newText: string) => void;
  changeSearchTextToEmpty?: (newText: string) => void;
  onClickInDetails?: () => void;
  onClickInShare?: () => void;
}

const emailSchema = yup.object().shape({
  email: yup.string().email(),
});

export const ToolsList: React.FC<IToolsListProps> = ({
  searchText = '',
  emailText = '',
  showEmailInput = '',
  showEmailInputError = '',
  showSearchInput = false,
  showBackListQuestions = false,
  validateEmailText = false,

  changeSearchText,
  changeEmailText,
  changeSearchTextToEmpty,
  onClickInDetails,
  onClickInShare,
}) => {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      component={Paper}
      gap={1}
      alignItems="center"
    >
      {showSearchInput && (
        <>
          <TextField
            size="small"
            placeholder={Environment.SEARCH_INPUT}
            value={searchText}
            onChange={(e) => changeSearchText?.(e.target.value)}
          />

          {searchText.length > 0 && (
            <Box flex={1} display="flex" justifyContent="start">
              <Button
                variant="contained"
                color="primary"
                disableElevation
                startIcon={<Icon>close-rounded</Icon>}
                onClick={() => changeSearchTextToEmpty?.('')}
              >
                Dismiss
              </Button>
            </Box>
          )}
        </>
      )}
      {showEmailInput && (
        <>
          <Box flex={1} display="flex" justifyContent="end" gap={1}>
            <TextField
              size="small"
              placeholder={Environment.EMAIL_INPUT}
              value={emailText}
              onChange={(e) => changeEmailText?.(e.target.value)}
              type="email"
              label="email"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              disableElevation
              startIcon={<Icon>email</Icon>}
              onClick={() => onClickInShare?.()}
            >
              Share
              {}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
