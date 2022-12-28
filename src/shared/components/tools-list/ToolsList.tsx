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

// const [input, setInput] = useState('');
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
  // const [emailValid, setEmailValid] = useState(false);

  // const handleSubmit = () => {
  //   emailSchema
  //     .isValid({
  //       email: emailText,
  //     })
  //     .then((valid) => {
  //       if (valid) {
  //         console.log('validar email', valid);
  //         setEmailValid(valid);
  //       } else {
  //         setEmailValid(valid);
  //       }
  //     });
  // };
  // .catch((errors: yup.ValidationError) => {
  //   errors.inner.forEach((error) => {
  //     console.log('validar email', error);
  //     if (error.path === 'email') {
  //       // setEmailError(error.message);

  //       console.log('Invalid email');
  //     }
  //   });
  // });
  // };

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
          <Box flex={1} display="flex" justifyContent="end">
            <TextField
              size="small"
              placeholder={Environment.EMAIL_INPUT}
              value={emailText}
              onChange={(e) => changeEmailText?.(e.target.value)}
              type="email"
              label="email"
              variant="outlined"
              // error={emailValid}
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
      {/* {!showSearchInput && showBackListQuestions && (
        <Box flex={1} display="flex" justifyContent="start">
          <Button
            variant="contained"
            color="primary"
            disableElevation
            startIcon={<Icon>arrow_back</Icon>}
          >
            Back to List
          </Button>
        </Box>
      )} */}
    </Box>
  );
};
