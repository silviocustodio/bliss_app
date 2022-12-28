import {
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToolsDetails, ToolsList } from '../../shared/components';
import { CheckServerContext } from '../../shared/contexts';
import { BaseLayoutPage } from '../../shared/layout';
import {
  IListQuestion,
  QuestionsService,
} from '../../shared/services/api/questions/QuestionsService';

export const QuestionDetails: React.FC = () => {
  const { id = 'details' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [choice, setChoice] = useState<IListQuestion>();
  const [email, setEmail] = useState('');

  const statusServerContext = useContext(CheckServerContext);

  useEffect(() => {
    setIsLoading(true);
    if (id !== 'details') {
      update(Number(id));
    }
  }, [id]);

  const update = (id: number) => {
    QuestionsService.getById(Number(id)).then((result) => {
      setIsLoading(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setChoice(result.data);
      }
    });
  };

  const updateVoteValue = (idChoice: number) => {
    if (choice) {
      choice.choices[idChoice].votes++;

      const body = JSON.stringify(choice);
      try {
        const done = QuestionsService.updateVote(id, body).then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            update(Number(id));
            alert('Your vote has been sent successfully');
          }
        });
        console.log(done);
      } catch (error) {
        console.log(error);
        console.log('Error in service.');
      }
    }
  };

  const shareEmail = () => {
    try {
      const done = QuestionsService.share(email, Number(id)).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('email sent');
        }
      });
      console.log(done);
    } catch (error) {
      console.log(error);
      console.log('Error in service.');
    }
  };

  return (
    <BaseLayoutPage
      title="Question details"
      navBar={
        <>
          <ToolsDetails
            showBackToListButton
            onClickInBackToList={() => navigate('/questions')}
            emailText={email}
            onClickInShare={() => shareEmail()}
            showEmailInput
            changeEmailText={(text) => setEmail(text)}
          />
        </>
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
                <TableCell>Choice</TableCell>
                <TableCell>Votes</TableCell>
                <TableCell>to vote</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {choice?.choices.map(({ choice, votes }, index) => (
                <TableRow key={choice}>
                  <TableCell>{choice}</TableCell>
                  <TableCell>{votes}</TableCell>
                  <TableCell>
                    <Button onClick={() => updateVoteValue(index)}>Vote</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <LinearProgress variant="indeterminate" />
                    Check the server...
                    {statusServerContext.status}
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={3}>
                  {' '}
                  Published at {choice?.published_at}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </>
    </BaseLayoutPage>
  );
};
