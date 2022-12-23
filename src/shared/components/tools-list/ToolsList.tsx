import { Paper, Box, Button, TextField, useTheme, Icon } from '@mui/material';

interface IToolsListProps {
  searchText?: string;
  showSearchInput?: boolean;
  showBackListQuestions?: boolean;
  changeSearchText?: (newText: string) => void;
}

export const ToolsList: React.FC<IToolsListProps> = ({
  searchText = '',
  showSearchInput = false,
  showBackListQuestions = false,
  changeSearchText,
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
            placeholder="Search question..."
            value={searchText}
            onChange={(e) => changeSearchText?.(e.target.value)}
          />
          <Box flex={1} display="flex" justifyContent="start">
            <Button
              variant="contained"
              color="primary"
              disableElevation
              startIcon={<Icon>close-rounded</Icon>}
            >
              Dismiss
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
