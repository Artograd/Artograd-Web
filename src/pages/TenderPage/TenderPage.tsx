import { useParams } from 'react-router-dom';

type TenderRouteParams = {
  tenderId: string;
};

export const TenderPage = () => {
  const { tenderId } = useParams<TenderRouteParams>();
  return <>Tender details (id: {tenderId})</>;
};
