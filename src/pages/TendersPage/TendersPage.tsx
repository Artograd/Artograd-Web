import {
  Badge,
  Button,
  ControlGroup,
  FlexCell,
  FlexRow,
  FlexSpacer,
  InputAddon,
  Paginator,
  Panel,
  PickerInput,
  SearchInput,
  Text,
} from '@epam/uui';
import styles from './TendersPage.module.scss';
import EmptyFolderIcon from '../../images/emptyFolderIcon.svg';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { TenderCard } from '../../components/TenderCard/TenderCard';
import { mockData as testData } from './mockData';
import { useEffect, useState } from 'react';
import { CityItemType, Tender, TenderStatus } from '../../types';
import { useArrayDataSource } from '@epam/uui-core';
import { getCityList } from '../../requests';
import axios from 'axios';

export const TendersPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [value, onValueChange] = useState<number>(1);
  const [data, setData] = useState<Tender[]>([]);
  const [searchValue, onSearchValueChange] = useState<string>();
  const [listOfCities, setListOfCities] = useState<CityItemType[]>();
  const [statusFilterValue, onStatusFilterValueChange] = useState<
    | {
        id: number;
        name: string;
      }[]
    | unknown[]
  >([]);
  const [locationFilterValue, onLocationFilterValueChange] = useState<
    CityItemType[] | unknown[]
  >([]);
  const userRoles = useSelector(
    (state: RootState) => state?.identity?.userData['cognito:groups'],
  );
  const isOfficer = userRoles?.includes('Officials');
  const statusesList = Object.values(TenderStatus).map((status, index) => ({
    id: index,
    name: status.toLowerCase(),
  }));

  const statusesProvider = useArrayDataSource(
    {
      items: statusesList,
    },
    [],
  );

  const citiesProvider = useArrayDataSource(
    {
      items: listOfCities,
    },
    [],
  );

  // const moveAttentionRequiredTender = () => {
  //   mockData.map((elem, index) => {
  //     if (elem.status.toLowerCase() === TenderStatus.SELECTION.toLowerCase()) {
  //       mockData.splice(index, 1);
  //       mockData.splice(0, 0, elem);
  //     }
  //   });
  //   return mockData;
  // };

  // useEffect(() => {
  //   moveAttentionRequiredTender();
  // }, []);

  const getTenders = () => {
    return axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/tenders`)
      .then((response) => setData(response.data));
  };

  useEffect(() => {
    getTenders();
  }, []);

  const mockData = data;

  console.log(testData);
  console.log(data);

  useEffect(() => {
    setIsLoading(true);
    getCityList()
      .then((response) => setListOfCities(response))
      .then(() => setIsLoading(false))
      .catch(() => {
        setListOfCities([]);
        setIsLoading(false);
      });
  }, []);

  return (
    <Panel cx={styles.wrapper}>
      <FlexRow>
        <FlexCell width="100%">
          <Text cx={styles.pageTitle}>
            {t('tendersPages.tenders.pageTitle')}
          </Text>
        </FlexCell>
        <FlexSpacer />
        <FlexCell width="100%">
          {mockData?.length >= 1 && isOfficer && (
            <Button
              color="accent"
              caption={t('tendersPages.tenders.tendersCta')}
              onClick={() => history.push('/tenders/new')}
              rawProps={{ 'data-testid': `header-create-new-tender-cta` }}
              cx={styles.headerTendersCta}
            />
          )}
        </FlexCell>
      </FlexRow>
      <Panel cx={styles.contentWrapper}>
        <FlexRow cx={styles.filtersWrapper}>
          <FlexRow cx={styles.creatorFilter}>
            <Badge
              color="info"
              fill="solid"
              caption={t('tendersPages.tenders.allCta')}
            />
            <Badge
              color="neutral"
              fill="solid"
              caption={t('tendersPages.tenders.createdByMeCta')}
            />
          </FlexRow>
          <ControlGroup>
            <InputAddon
              content={t('tendersPages.tenders.statusFilterPrefix')}
              cx={styles.prefix}
            />
            <PickerInput
              dataSource={statusesProvider}
              value={statusFilterValue}
              onValueChange={onStatusFilterValueChange}
              getName={(item: { id: number; name: string }) =>
                t(`global.statuses.${item.name}`)
              }
              entityName="Status filter"
              selectionMode="multi"
              valueType="id"
              inputCx={styles.statusInput}
              placeholder={t('tendersPages.tenders.statusFilterPlaceholder')}
            />
            <InputAddon
              content={t('tendersPages.tenders.cityFilterPrefix')}
              cx={styles.prefix}
            />
            <PickerInput
              dataSource={citiesProvider}
              value={locationFilterValue}
              onValueChange={onLocationFilterValueChange}
              getName={(item: CityItemType) => item.name}
              entityName="Cities filter"
              selectionMode="multi"
              valueType="id"
              inputCx={styles.citiesInput}
              placeholder={t('tendersPages.tenders.cityFilterPlaceholder')}
              sorting={{ field: 'name', direction: 'asc' }}
              isDisabled={isLoading}
            />
          </ControlGroup>
          <FlexSpacer />
          <FlexCell width="auto">
            <SearchInput
              value={searchValue}
              onValueChange={onSearchValueChange}
              placeholder={t('tendersPages.tenders.searchInputPlaceholder')}
              debounceDelay={1000}
              cx={styles.searchField}
            />
          </FlexCell>
        </FlexRow>
        {mockData?.length === 0 && isOfficer && <NoTenders />}
        {mockData?.length >= 1 &&
          mockData?.map(
            (tender) => mockData && <TenderCard key={tender._id} {...tender} />,
          )}
      </Panel>
      <FlexRow alignItems="center" cx={styles.paginatorWrapper}>
        <Paginator
          size="24"
          totalPages={1}
          value={value}
          onValueChange={onValueChange}
        />
      </FlexRow>
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
          {t('tendersPages.tenders.tendersTitle')}
        </Text>
        <Text cx={styles.tendersDescription}>
          {t('tendersPages.tenders.tendersDescription')}
        </Text>

        <Button
          color="accent"
          caption={t('tendersPages.tenders.tendersCta')}
          onClick={() => history.push('/tenders/new')}
          rawProps={{ 'data-testid': `content-create-new-tender-cta` }}
        />
      </FlexCell>
    </FlexRow>
  );
};
