import { createContext, useEffect, useState } from 'react';
import {
  ICheckStatusServer,
  QuestionsService,
} from '../services/api/questions/QuestionsService';

interface ICheckServerContextData {
  status: string;
}

export const CheckServerContext = createContext<ICheckServerContextData>(
  {} as ICheckServerContextData
);

interface ICheckServerProvider {
  children: React.ReactNode;
}

// const [status, setStatus] = useState('NOT OK');
// const [statusServer, setStatusServer] = useState<any>();
// export const CheckServerAccess = () => {
//   useEffect(() => {
//     // setIsLoading(true);
//     // console.log('result setChoice before ====> ', choice);
//     QuestionsService.getHealth().then((result) => {
//       // setIsLoading(false);
//       if (result instanceof Error) {
//         alert(result.message);
//       } else {
//         // setStatusServer(result.data);
//         console.log('result getHealth====> ', result.data);
//       }
//     });
//   }, []);
// };

// export const CheckServerProvider: React.FC<ICheckServerProvider> = ({
//   children,
// }) => {
//   useEffect(() => {
//     // setIsLoading(true);
//     // console.log('result setChoice before ====> ', choice);
//     QuestionsService.getHealth().then((result) => {
//       // setIsLoading(false);
//       if (result instanceof Error) {
//         alert(result.message);
//       } else {
//         setStatusServer(result.data);
//         console.log('result getHealth====> ', result.data);
//       }
//     });
//   }, [statusServer]);

//   return (
//     <CheckServerContext.Provider value={{ status: statusServer?.status }}>
//       {children}
//     </CheckServerContext.Provider>
//   );
// };

interface ICheckServerProvider {
  children: React.ReactNode;
}
export const CheckServerProvider: React.FC<ICheckServerProvider> = ({
  children,
}) => {
  const [statusServer, setStatusServer] = useState<ICheckServerContextData>();

  useEffect(() => {
    QuestionsService.getHealth().then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        console.log('result novo  ===>', result);

        setStatusServer(result.data);
        // setRows(result.data), setTotalCount(result.totalCount);
      }
    });
  }, []);

  return (
    <CheckServerContext.Provider value={{ status: statusServer?.status ?? '' }}>
      {children}
    </CheckServerContext.Provider>
  );
};
