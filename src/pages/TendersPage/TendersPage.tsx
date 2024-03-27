import {
  Badge,
  Button,
  ControlGroup,
  FlexCell,
  FlexRow,
  FlexSpacer,
  InputAddon,
  Panel,
  PickerInput,
  SearchInput,
  Spinner,
  Text,
} from '@epam/uui';
import styles from './TendersPage.module.scss';
import EmptyFolderIcon from '../../images/emptyFolderIcon.svg';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { TenderCard } from '../../components/TenderCard/TenderCard';
import { useEffect, useState } from 'react';
import { CityItemType, Tender, TenderStatus } from '../../types';
import { useArrayDataSource } from '@epam/uui-core';
import { getCityList, getTenders } from '../../requests';
import axios from 'axios';

export const TendersPage = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(0);
  const [tendersList, setTendersList] = useState<Tender[]>([]);
  // const [noData, setNoData] = useState(false);

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

  const moveAttentionRequiredTender = (tenders: Tender[]) => {
    tenders.map((tender, index) => {
      if (
        tender.status.toLowerCase() === TenderStatus.SELECTION.toLowerCase()
      ) {
        tenders.splice(index, 1);
        tenders.splice(0, 0, tender);
      }
    });
    return tenders;
  };

  useEffect(() => {
    getTenders(page)
      .then((response) => moveAttentionRequiredTender(response.data))
      .then((sortedData) => setTendersList(sortedData));

    getCityList()
      .then((response) => setListOfCities(response))
      .catch(() => {
        setListOfCities([]);
      });
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/tenders?page=${page}`)
      .then((response) => {
        setTendersList((prevItems) => [...prevItems, ...response.data]);
        setPage((prevPage) => prevPage + 1);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    if (tendersList.length >= (page + 1) * 10) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isLoading]);

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
          {tendersList?.length >= 1 && isOfficer && (
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
        {tendersList?.length >= 1 && (
          <FlexRow cx={styles.filtersWrapper}>
            <FlexRow cx={styles.creatorFilter}>
              <Badge
                color="info"
                fill="solid"
                caption={t('tendersPages.tenders.allCta')}
              />
              {isOfficer && (
                <Badge
                  color="neutral"
                  fill="solid"
                  caption={t('tendersPages.tenders.createdByMeCta')}
                />
              )}
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
        )}
        {tendersList?.length >= 1 &&
          tendersList?.map((tender) => (
            <TenderCard key={tender.id} {...tender} />
          ))}
        {isLoading && (
          <FlexRow>
            <Spinner />
          </FlexRow>
        )}
        {isError && <FlexRow>Oops! Something went wrong.</FlexRow>}
        {tendersList?.length === 0 && isOfficer && <NoTenders />}
        {tendersList.length <= (page + 1) * 10 && (
          <FlexCell textAlign="center">You have reached bottom.</FlexCell>
        )}
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
