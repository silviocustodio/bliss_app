import {
  Box,
  useTheme,
  Paper,
  Button,
  Icon,
  Skeleton,
  Typography,
  TextField,
} from '@mui/material';
import { Environment } from '../../environment';

interface IToolsDetailsProps {
  textDismissButton?: string;
  textBackToListButton?: string;
  emailText?: string;
  showEmailInput?: boolean;

  showTextDismissButton?: boolean;
  showTextDismissButtonLoading?: boolean;
  showBackToListButton?: boolean;

  onClickInDismiss?: () => void;
  onClickInBackToList?: () => void;
  onClickInShare?: () => void;
  changeEmailText?: (newText: string) => void;
}

export const ToolsDetails: React.FC<IToolsDetailsProps> = ({
  textDismissButton = 'Dismiss',
  textBackToListButton = 'Back to List',
  showTextDismissButton = false,
  showBackToListButton = false,
  showTextDismissButtonLoading = false,

  emailText = '',
  showEmailInput = '',

  onClickInDismiss,
  onClickInBackToList,
  changeEmailText,
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
