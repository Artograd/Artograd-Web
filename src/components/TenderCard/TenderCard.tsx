import {
  Badge,
  Button,
  Dropdown,
  DropdownMenuBody,
  DropdownMenuButton,
  FlexCell,
  FlexRow,
  FlexSpacer,
} from '@epam/uui';
import dayjs from 'dayjs';
import styles from './TenderCard.module.scss';
import { DropdownBodyProps } from '@epam/uui-core';
import { ReactComponent as DeleteIcon } from '@epam/assets/icons/common/action-delete-18.svg';
import { ReactComponent as MenuIcon } from '@epam/assets/icons/common/navigation-more_vert-18.svg';
import { ReactComponent as RightChevronIcon } from '@epam/assets/icons/common/navigation-chevron-right-18.svg';
import { ReactComponent as AttachmentIcon } from '@epam/assets/icons/common/file-attachment-12.svg';
import { ReactComponent as AttentionIcon } from '@epam/assets/icons/common/notification-error-outline-18.svg';
import { ReactComponent as GeoLocationIcon } from '@epam/assets/icons/common/communication-geo_tag-18.svg';
import { ReactComponent as StarIcon } from '@epam/assets/icons/common/fav-rates-star-12.svg';
import { getCategoryName } from '../../utils/getCategoryName';
import { useTranslation } from 'react-i18next';
import { Proposals, TenderStatus } from '../../types';
import { Dot } from '../Dot/Dot';
import { ProposalCard } from '../ProposalCard/ProposalCard';

type LocationType = {
  nestedLocation: {
    _id: string;
    name: string;
  };
  geoPosition: {
    latitude: string;
    longitude: string;
  };
  addressLine: string;
  addressComment: string;
};

type TenderCardProps = {
  organization?: string;
  submissionStart?: string;
  submissionEnd?: string;
  files?: string[];
  status?: TenderStatus;
  category?: string[];
  location?: LocationType;
  expectedDelivery?: string;
  title?: string;
  description?: string;
  proposals?: Proposals[];
};

export const TenderCard = ({
  organization,
  submissionStart,
  submissionEnd,
  files,
  status,
  category,
  location,
  expectedDelivery,
  title,
  description,
  proposals,
}: TenderCardProps) => {
  const renderThirdDropdownBody = (props: DropdownBodyProps) => {
    return (
      <DropdownMenuBody {...props} rawProps={{ style: { padding: 0 } }}>
        <DropdownMenuButton caption="Delete" icon={DeleteIcon} />
      </DropdownMenuBody>
    );
  };
  const { t } = useTranslation();
  const isProposalsExist = proposals?.length === 0;
  return (
    // CARD
    <FlexRow cx={styles.wrapper}>
      {/* content */}
      <FlexCell width="100%" cx={styles.content}>
        {/* meta first row */}
        <FlexRow cx={styles.meta}>
          {/* meta */}
          <FlexCell width="auto" cx={styles.flex}>
            <span className={styles.dimmed}>
              {t('tendersPage.tenders.tenderCard.postedBy')}:
            </span>
            {organization}
            <Dot />
            <span className={styles.dimmed}>
              {t('tendersPage.tenders.tenderCard.tenderValidity')}:
            </span>
            {`
              ${dayjs(Number(submissionStart)).format('D MMM YYYY')} - ${dayjs(
              Number(submissionEnd),
            ).format('D MMM YYYY')}`}
            <Dot />
            <Badge
              size="18"
              color="neutral"
              fill="solid"
              icon={AttachmentIcon}
              caption={files?.length}
              cx={styles.filesAmountBadge}
            />
          </FlexCell>
          <FlexSpacer />
          {/* status */}
          <FlexCell
            width="auto"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {status === TenderStatus.SELECTION && (
              <Button
                icon={AttentionIcon}
                iconPosition="left"
                caption={t('tendersPage.tenders.tenderCard.actionRequiredCta')}
                fill="ghost"
                onClick={() => null}
                cx={styles.actionRequiredCta}
              />
            )}
            <span className={styles.flex}>
              <Dot status={status} />
              {t(`global.statuses.${status?.toLowerCase()}`)}
            </span>
          </FlexCell>
        </FlexRow>
        {/* meta second row */}
        <FlexRow cx={styles.meta}>
          {/* meta */}
          <FlexCell width="auto" cx={styles.flex}>
            <span className={`${styles.categories} ${styles.flex}`}>
              {category?.map((category) => (
                <Badge
                  size="18"
                  color="neutral"
                  fill="solid"
                  caption={t(`${getCategoryName(category)?.name}`)}
                  cx={styles.categoryBadge}
                />
              ))}
            </span>
            <Dot />
            <GeoLocationIcon className={styles.geoLocationIcon} />
            {`${process.env.REACT_APP_LOCATION}, ${location?.nestedLocation.name}`}
          </FlexCell>
          <FlexSpacer />
          {/* expected readiness */}
          <FlexCell width="auto">
            <span className={styles.dimmed}>
              {t('tendersPage.tenders.tenderCard.readiness')}:
            </span>
            {dayjs(Number(expectedDelivery)).format('D MMM YYYY')}
          </FlexCell>
        </FlexRow>
        {/* title */}
        <FlexRow cx={styles.title}>{title}</FlexRow>
        {/* description */}
        <FlexRow cx={styles.description}>{description}</FlexRow>
        {/* submitted proposals title with button */}
        {status !== TenderStatus.DRAFT && (
          <FlexRow cx={styles.proposalsLabel}>
            {t('tendersPage.tenders.tenderCard.submittedProposalsLabel')}
            {!isProposalsExist && `(${proposals?.length})`}
            <Button
              icon={RightChevronIcon}
              iconPosition="right"
              caption={t(
                'tendersPage.tenders.tenderCard.viewAllSubmittedProposalsCta',
              )}
              fill="ghost"
              onClick={() => null}
              isDisabled={isProposalsExist}
            />
          </FlexRow>
        )}
        {/* proposals cards */}
        {isProposalsExist &&
          status !== TenderStatus.DRAFT &&
          status !== TenderStatus.CANCELLED && (
            <FlexRow cx={styles.noProposalsInfoText}>
              {t('tendersPage.tenders.tenderCard.noSubmittedProposals')}
            </FlexRow>
          )}
        {status === TenderStatus.CLOSED && (
          <FlexRow cx={styles.noProposalsInfoText}>
            <Badge
              size="18"
              color="info"
              fill="solid"
              caption={t(
                'tendersPage.tenders.tenderCard.proposals.winnerBadge',
              )}
              icon={StarIcon}
              cx={styles.winnerBadge}
            />
            <span>
              {proposals?.find((proposal) => proposal.selected)?.title}
            </span>
            <Button
              icon={RightChevronIcon}
              iconPosition="right"
              caption={t(
                'tendersPage.tenders.tenderCard.proposals.viewDetailsCta',
              )}
              fill="ghost"
              onClick={() => null}
              isDisabled={isProposalsExist}
            />
          </FlexRow>
        )}
        {/* proposal cards */}
        {status !== TenderStatus.CLOSED &&
          proposals
            ?.slice(0, 2)
            .map((proposal) => <ProposalCard proposal={proposal} />)}
      </FlexCell>
      {/* 3 dots menu */}
      <FlexCell
        cx={styles.optionsCtaWrapper}
        width="auto"
        alignSelf="flex-start"
      >
        <Dropdown
          renderBody={renderThirdDropdownBody}
          renderTarget={(props) => (
            <Button
              {...props}
              fill="ghost"
              icon={MenuIcon}
              size="36"
              isDropdown={false}
              cx={styles.optionCta}
            />
          )}
          placement="bottom-end"
        />
      </FlexCell>
    </FlexRow>
  );
};
