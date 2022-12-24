import {
  Box,
  useTheme,
  Paper,
  Button,
  Icon,
  Skeleton,
  Typography,
} from '@mui/material';

interface IToolsDetailsProps {
  textDismissButton?: string;
  textBackToListButton?: string;

  showTextDismissButton?: boolean;
  showTextDismissButtonLoading?: boolean;
  showBackToListButton?: boolean;

  onClickInDismiss?: () => void;
  onClickInBackToList?: () => void;
}

export const ToolsDetails: React.FC<IToolsDetailsProps> = ({
  textDismissButton = 'Dismiss',
  textBackToListButton = 'Back to List',
  showTextDismissButton = false,
  showBackToListButton = false,
  showTextDismissButtonLoading = false,

  onClickInDismiss,
  onClickInBackToList,
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
      {showTextDismissButton && !showTextDismissButtonLoading && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={onClickInDismiss}
          startIcon={<Icon>close-rounded</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {textDismissButton}
          </Typography>
        </Button>
      )}

      {showTextDismissButtonLoading && <Skeleton width={110} height={60} />}

      {showBackToListButton && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={onClickInBackToList}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {textBackToListButton}
          </Typography>
        </Button>
      )}
    </Box>
  );
};
