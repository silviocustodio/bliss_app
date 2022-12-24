import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToolsDetails, ToolsList } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { BaseLayoutPage } from '../../shared/layout';
import { QuestionsService } from '../../shared/services/api/questions/QuestionsService';

export const QuestionList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000, false);
  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      QuestionsService.getAll(1, search).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);
        }
      });
    });
  }, [search]);

  return (
    <BaseLayoutPage
      title="Question List"
      //   navBar={<ToolsList showSearchInput={false} showBackListQuestions />}
      navBar={
        <ToolsList
          showSearchInput
          searchText={search}
          changeSearchText={(text) =>
            setSearchParams({ search: text }, { replace: true })
          }
        />
      }
    >
      test
    </BaseLayoutPage>
  );

  //   <BaseLayoutPage title="Question section" navBar={<ToolsDetails />}></BaseLayoutPage>);
};
