import { createContext, useEffect, useState } from 'react';
import { QuestionsService } from '../services/api/questions/QuestionsService';

interface ICheckServerContextData {
  status: string;
}

export const CheckServerContext = createContext<ICheckServerContextData>(
  {} as ICheckServerContextData
);

interface ICheckServerProvider {
  children: React.ReactNode;
}

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
        setStatusServer(result.data);
      }
    });
  }, []);

  return (
    <CheckServerContext.Provider value={{ status: statusServer?.status ?? '' }}>
      {children}
    </CheckServerContext.Provider>
  );
};
