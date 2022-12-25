import { Environment } from './../../../environment/index';
import { Api } from '../axios-config';

export interface IListQuestion {
  id: number;
  question: string;
  image_url: string;
  thumb_url: string;
  published_at: string;
  choices: IListChoiceQuestion[];
}
export interface IListChoiceQuestion {
  choice: string;
  votes: number;
}
type TListQuestion = {
  data: IListQuestion[];
  totalCount: number;
};
type TListDetailsQuestion = {
  data: IListQuestion;
};

const getAll = async (
  offset = 10,
  filter = ''
): Promise<TListQuestion | Error> => {
  try {
    const relativeURL = `/questions?limit=${Environment.LIMIT_REQUEST}&offset=${offset}&filter=${filter}`;
    const { data, headers } = await Api.get(relativeURL);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers['x-total-count'] || Environment.LIMIT_REQUEST
        ),
      };
    }
    return new Error('Error getting questions');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Error getting questions'
    );
  }
};
const getById = async (id: number): Promise<TListDetailsQuestion | Error> => {
  try {
    const { data } = await Api.get(`/questions/${id}`);

    if (data) {
      return {
        data,
      };
    }
    return new Error('Error getting question');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Error getting records'
    );
  }
};
const getHealth = async (): Promise<any> => {
  try {
    const { data } = await Api.get('/health');

    if (data) {
      return data;
    }
    return new Error('Error getting health state');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Error getting health state'
    );
  }
};
// const handleRefresh = async (): Promise<any> => {};

//updating the question votes with the answer that the user clicked
const updateVote = async (
  id: number,
  dataQuestion: IListQuestion
): Promise<void | Error> => {
  try {
    await Api.put(`/questions/${id}`, dataQuestion);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Error updating vote'
    );
  }
};

export const QuestionsService = {
  getAll,
  getById,
  // handleRefresh,
  getHealth,
  updateVote,
};
