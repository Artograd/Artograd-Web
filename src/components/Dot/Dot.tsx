import { TenderStatus } from '../../types';

export const Dot = ({ status }: { status?: TenderStatus }) => {
  const determineColor = () => {
    switch (status) {
      case TenderStatus.IDEATION:
        return '#006FE5';
      case TenderStatus.VOTING:
        return '#B114D1';
      case TenderStatus.SELECTION:
        return '#AAEEEE';
      case TenderStatus.CLOSED:
        return '#068745';
      case TenderStatus.DRAFT:
      case TenderStatus.CANCELLED:
      default:
        return '#bbb';
    }
  };
  return (
    <>
      <span
        style={{
          height: '6px',
          width: '6px',
          backgroundColor: determineColor(),
          borderRadius: '50%',
          display: 'inline-block',
          margin: 'auto 6px',
        }}
      ></span>
    </>
  );
};
