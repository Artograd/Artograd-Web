import { Button, FlexCell, FlexRow, FlexSpacer, Panel, Text } from '@epam/uui';
import styles from './TendersPage.module.scss';
import EmptyFolderIcon from '../../images/emptyFolderIcon.svg';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { TenderStatus } from '../../types';

const tendersListLength = 1;

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
        <NoTenders />
        <TenderCard />
      </Panel>
    </Panel>
  );
};

const mockData = {
  postedBy: 'regional office',
  tenderValidity: {
    from: '10 Feb 2024',
    to: '20 Mar 2024',
  },
  readiness: '15 Feb 2024',
  attachments: ['1', '2', '3'],
  status: TenderStatus.IDEATION,
  categories: ['Sculpture', 'Outdoors'],
  location: {
    country: 'Montenegro',
    city: 'Kotor',
  },
  title: 'Architectural decoration of the embankment',
  description:
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
  proposals: [],
};

const TenderCard = () => {
  return (
    // CARD
    <FlexRow>
      {/* content */}
      <FlexCell width="100%">
        {/* meta first row */}
        <FlexRow>
          {/* meta */}
          <FlexCell width="auto">
            Posted by: {mockData.postedBy} | Tender validity period:
            {`
            ${mockData.tenderValidity.from} - ${mockData.tenderValidity.to}`}{' '}
            | {mockData.attachments.length}
          </FlexCell>
          <FlexSpacer />
          {/* status */}
          <FlexCell width="auto">{mockData.status}</FlexCell>
        </FlexRow>
        {/* meta second row */}
        <FlexRow>
          {/* meta */}
          <FlexCell width="auto">
            {mockData.categories.map((category) => category)} |{' '}
            {`${mockData.location.country}, ${mockData.location.city}`}
          </FlexCell>
          <FlexSpacer />
          {/* expected readiness */}
          <FlexCell width="auto">
            Expected readiness: {mockData.readiness}
          </FlexCell>
        </FlexRow>
        {/* title */}
        <FlexRow>{mockData.title}</FlexRow>
        {/* description */}
        <FlexRow>{mockData.description}</FlexRow>
        {/* submitted proposals title with button */}
        <FlexRow>Submitted proposals</FlexRow>
        {/* proposals cards */}
        <FlexRow>No proposals submitted yet.</FlexRow>
      </FlexCell>
      {/* 3 dots menu */}
      <FlexCell>...</FlexCell>
    </FlexRow>
  );
};

const NoTenders = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const userRoles = useSelector(
    (state: RootState) => state?.identity?.userData['cognito:groups'],
  );
  const isOfficer = userRoles?.includes('Officials');
  return (
    <FlexRow>
      {tendersListLength >= 1 && isOfficer && (
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
      )}
    </FlexRow>
  );
};
