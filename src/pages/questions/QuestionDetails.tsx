import { ChatBubbleOutlineSharp } from '@mui/icons-material';
import {
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToolsDetails } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { BaseLayoutPage } from '../../shared/layout';
import {
  IListChoiceQuestion,
  IListQuestion,
  QuestionsService,
} from '../../shared/services/api/questions/QuestionsService';

export const QuestionDetails: React.FC = () => {
  const { id = 'details' } = useParams<'id'>();
  const navigate = useNavigate();
  const { debounce } = useDebounce(3000, true);
  const [isLoading, setIsLoading] = useState(true);
  const [choice, setChoice] = useState<IListQuestion>();

  //   const handleDetails = (id: number) => {
  //     console.log();

  //     QuestionsService.getById(id).then((result) => {
  //       if (result instanceof Error) {
  //         alert(result.message);
  //       } else {
  //         console.log('result byID ====> ', result);

  //       }
  //     });
  //   };

  useEffect(() => {
    setIsLoading(true);
    console.log('result setChoice before ====> ', choice);
    if (id !== 'details') {
      QuestionsService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setChoice(result.data);
        }
      });
    }
  }, [id]);
  console.log('result setChoice after ====> ', choice);
  return (
    <BaseLayoutPage
      title="Question details"
      navBar={
        <ToolsDetails
          showBackToListButton
          onClickInBackToList={() => navigate('/questions')}
        />
      }
    >
      <>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ m: 1, width: 'auto' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>choice</TableCell>
                <TableCell>votes</TableCell>
                <TableCell>to vote</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {choice?.choices.map(({ choice, votes }) => (
                <TableRow key={choice}>
                  <TableCell>{choice}</TableCell>
                  <TableCell>{votes}</TableCell>
                  <TableCell>Vote</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </BaseLayoutPage>
  );
};
