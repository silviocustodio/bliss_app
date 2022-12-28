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
export interface ICheckStatusServer {
  status: string;
}
type TListQuestion = {
  data: IListQuestion[];
  totalCount: number;
};
type TListDetailsQuestion = {
  data: IListQuestion;
};

type TCheckStatusServer = {
  data: ICheckStatusServer;
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
// const getHealth = async (): Promise<any | Error> => {
//   try {
//     const { data } = await Api.get('/health');

//     if (data) {
//       console.log('getHealth =====> ', data);
//       return data;
//     }
//     return new Error('Error getting health state');
//   } catch (error) {
//     console.error(error);
//     return new Error(
//       (error as { message: string }).message || 'Error getting health state'
//     );
//   }
// };
// const handleRefresh = async (): Promise<any> => {};
//checking the health of the server
// const getHealth = async  (): Promise<any | Error> =>{
//   try {
//     const { data } = await Api.get(
//       'https://private-9a6a89-blissrecruitmentapi.apiary-mock.com/health'
//     );

//     if (data) {
//       return data;
//     }
//   } catch (error) {
//     console.log('There was an error in async list load service');
//     throw error;
//   }
// };

const getHealth = async (): Promise<TCheckStatusServer | Error> => {
  try {
    const { data } = await Api.get('/health');

    if (data) {
      return {
        data,
      };
    }
    return new Error('Error getting status server');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Error getting status server'
    );
  }
};

const share = async (
  email: string,
  offset = 10,
  search: string
): Promise<any | Error> => {
  try {
    if (search) {
      const { data } = await Api.post(
        `/share?destination_email=${email}&content_url=http://localhost:3000/questions?search=${search}&offset=${offset}`
      );

      if (data) {
        return {
          data,
        };
      }
    } else {
      const { data } = await Api.post(
        `/share?destination_email=${email}&content_url=http://localhost:3000/questions?limit=10&offset=${offset}`
      );

      if (data) {
        return {
          data,
        };
      }
    }
    return new Error('Error getting status server');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Error getting status server'
    );
  }
}; //updating the question votes with the answer that the user clicked
const updateVote = async (
  id: string,
  dataQuestion: string
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
  share,
  getHealth,
  updateVote,
};
