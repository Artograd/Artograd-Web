import { Button, FlexCell, FlexRow, FlexSpacer, Panel, Text } from '@epam/uui';
import styles from './TendersPage.module.scss';
import EmptyFolderIcon from '../../images/emptyFolderIcon.svg';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { TenderStatus } from '../../types';
import { TenderCard } from './TenderCard';

const tendersListLength = 1;
// temp mock data
const mockData = [
  {
    _id: '65faecb9ee16c743fc5cfe93',
    title: 'Architectural decoration of the embankment',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    submissionStart: '1711324800000',
    submissionEnd: '1711670400000',
    expectedDelivery: '1711756800000',
    category: ['1', '9', '0'],
    location: {
      nestedLocation: {
        _id: '65f181408de8fcd02bd9930b',
        name: 'Baošići',
      },
      geoPosition: {
        latitude: '42.4429',
        longitude: '18.627',
      },
      addressLine: 'wqertyuiytr 22',
      addressComment: 'wertyuiytr',
    },
    locationLeafId: '65f181408de8fcd02bd9930b',
    showEmail: true,
    files: ['1', '2', '3'],
    snapFiles: [],
    status: TenderStatus.IDEATION,
    ownerName: 'undefined undefined',
    ownerId: 'qwerty',
    createdAt: '1710943414607',
    modifiedAt: '1710943414607',
    organization: 'Testing organization',
    proposals: [],
  },
  {
    _id: '65faecb9ee16c743fc5cfe93',
    title: 'Architectural decoration of the embankment',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    submissionStart: '1711324800000',
    submissionEnd: '1711670400000',
    expectedDelivery: '1711756800000',
    category: ['1', '9', '0'],
    location: {
      nestedLocation: {
        _id: '65f181408de8fcd02bd9930b',
        name: 'Baošići',
      },
      geoPosition: {
        latitude: '42.4429',
        longitude: '18.627',
      },
      addressLine: 'wqertyuiytr 22',
      addressComment: 'wertyuiytr',
    },
    locationLeafId: '65f181408de8fcd02bd9930b',
    showEmail: true,
    files: ['1', '2', '3'],
    snapFiles: [],
    status: TenderStatus.IDEATION,
    ownerName: 'undefined undefined',
    ownerId: 'qwerty',
    createdAt: '1710943414607',
    modifiedAt: '1710943414607',
    organization: 'Testing organization',
    proposals: [],
  },
];

export const TendersPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const userRoles = useSelector(
    (state: RootState) => state?.identity?.userData['cognito:groups'],
  );
  const isOfficer = userRoles?.includes('Officials');

  return (
    <Panel cx={styles.wrapper}>
      <FlexRow>
        <FlexCell width="100%">
          <Text cx={styles.pageTitle}>
            {t('tendersPage.tenders.pageTitle')}
          </Text>
        </FlexCell>
        <FlexSpacer />
        <FlexCell width="100%">
          {tendersListLength >= 1 && isOfficer && (
            <Button
              color="accent"
              caption={t('tendersPage.tenders.tendersCta')}
              onClick={() => history.push('/tenders/new')}
              rawProps={{ 'data-testid': `header-create-new-tender-cta` }}
              cx={styles.headerTendersCta}
            />
          )}
        </FlexCell>
      </FlexRow>
      <Panel cx={styles.contentWrapper}>
        {tendersListLength >= 1 && isOfficer && <NoTenders />}
        {mockData.map((tender) => (
          <TenderCard {...tender} />
        ))}
      </Panel>
    </Panel>
  );
};

const NoTenders = () => {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <FlexRow>
      <FlexCell cx={styles.tenders} width="100%" textAlign="center">
        <img className={styles.emptyFolderIcon} src={EmptyFolderIcon} />
        <Text cx={styles.tendersTitle}>
          {t('tendersPage.tenders.tendersTitle')}
        </Text>
        <Text cx={styles.tendersDescription}>
          {t('tendersPage.tenders.tendersDescription')}
        </Text>

        <Button
          color="accent"
          caption={t('tendersPage.tenders.tendersCta')}
          onClick={() => history.push('/tenders/new')}
          rawProps={{ 'data-testid': `content-create-new-tender-cta` }}
        />
      </FlexCell>
    </FlexRow>
  );
};
