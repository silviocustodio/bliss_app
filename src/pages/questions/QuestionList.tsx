import { useEffect, useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  LinearProgress,
  IconButton,
  Icon,
  Typography,
  Tooltip,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToolsList } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { BaseLayoutPage } from '../../shared/layout';
import {
  IListQuestion,
  QuestionsService,
} from '../../shared/services/api/questions/QuestionsService';
import { Environment } from '../../shared/environment';
import Pagination from '@mui/material/Pagination';

export const QuestionList: React.FC = () => {
  interface ICheckServerContextData {
    status: string;
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState('');

  const [rows, setRows] = useState<IListQuestion[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { debounce } = useDebounce(3000, true);

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);

  const [statusServer, setStatusServer] = useState<ICheckServerContextData>();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      QuestionsService.getAll(page, search).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows(result.data), setTotalCount(result.totalCount);
        }
      });
    });
  }, [search, page]);

  useEffect(() => {
    QuestionsService.getHealth().then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setStatusServer(result.data);
      }
    });
  }, []);

  const shareEmail = () => {
    try {
      const done = QuestionsService.share(email, page, search).then(
        (result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('email sent');
          }
        }
      );
      console.log(done);
    } catch (error) {
      console.log(error);
      console.log('Error in service.');
    }
  };

  return (
    <BaseLayoutPage
      title="Question List"
      navBar={
        <ToolsList
          showSearchInput
          searchText={search}
          emailText={email}
          onClickInDetails={() => navigate('/question/details')}
          onClickInShare={() => shareEmail()}
          changeSearchText={(text) =>
            setSearchParams({ search: text, page: '1' }, { replace: true })
          }
          changeSearchTextToEmpty={() => setSearchParams({ search: '' })}
          showEmailInput
          changeEmailText={(text) => setEmail(text)}
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: 'auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Questions</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell size="small">
                  <img src={row.thumb_url} alt="" />
                </TableCell>
                <TableCell>
                  {' '}
                  {row.id} - {row.question}
                </TableCell>
                <TableCell>
                  <Tooltip title="Details">
                    <IconButton
                      onClick={() => navigate(`/questions/details/${row.id}`)}
                      color="primary"
                    >
                      <Icon>loupe</Icon>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LIST}</caption>
          )}

          <TableFooter>
            {isLoading && statusServer?.status === 'OK' && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                  <Typography>
                    Checking Status Server: {statusServer?.status}{' '}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {!isLoading && statusServer?.status === 'NOT OK' && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && Environment.LINE_LIMIT && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={Math.ceil(totalCount / Environment.LINE_LIMIT)}
                    onChange={(_, newPage) =>
                      setSearchParams(
                        { search, page: newPage.toString() },
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </BaseLayoutPage>
  );
};
