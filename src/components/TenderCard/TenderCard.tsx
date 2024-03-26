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
import { LocationType, Proposals, TenderStatus } from '../../types';
import { Dot } from '../Dot/Dot';
import { ProposalCard } from '../ProposalCard/ProposalCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

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
  ownerId?: string;
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
  ownerId,
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
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );
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
              {t('tendersPages.tenders.tenderCard.postedBy')}:
            </span>
            {organization}
            <Dot />
            <span className={styles.dimmed}>
              {t('tendersPages.tenders.tenderCard.tenderValidity')}:
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
            {status === TenderStatus.SELECTION && ownerId === username && (
              <Button
                icon={AttentionIcon}
                iconPosition="left"
                caption={t('tendersPages.tenders.tenderCard.actionRequiredCta')}
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
            {category?.length !== 0 && (
              <span className={`${styles.categories} ${styles.flex}`}>
                {category?.map((category, index) => (
                  <Badge
                    key={index}
                    size="18"
                    color="neutral"
                    fill="solid"
                    caption={t(`${getCategoryName(category)?.name}`)}
                    cx={styles.categoryBadge}
                  />
                ))}
              </span>
            )}
            {category?.length !== 0 && <Dot />}
            <GeoLocationIcon className={styles.geoLocationIcon} />
            {`${process.env.REACT_APP_LOCATION}, ${location?.nestedLocation.name}`}
          </FlexCell>
          <FlexSpacer />
          {/* expected readiness */}
          {expectedDelivery && (
            <FlexCell width="auto">
              <span className={styles.dimmed}>
                {t('tendersPages.tenders.tenderCard.readiness')}:
              </span>
              {dayjs(Number(expectedDelivery)).format('D MMM YYYY')}
            </FlexCell>
          )}
        </FlexRow>
        {/* title */}
        <FlexRow cx={styles.title}>{title}</FlexRow>
        {/* description */}
        <FlexRow cx={styles.description}>{description}</FlexRow>
        {/* submitted proposals title with button */}
        {status !== TenderStatus.DRAFT && (
          <FlexRow cx={styles.proposalsLabel}>
            {t('tendersPages.tenders.tenderCard.submittedProposalsLabel')}
            {isProposalsExist && `(${proposals?.length})`}
            <Button
              icon={RightChevronIcon}
              iconPosition="right"
              caption={t(
                'tendersPages.tenders.tenderCard.viewAllSubmittedProposalsCta',
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
              {t('tendersPages.tenders.tenderCard.noSubmittedProposals')}
            </FlexRow>
          )}
        {status === TenderStatus.CLOSED && (
          <FlexRow cx={styles.noProposalsInfoText}>
            <Badge
              size="18"
              color="info"
              fill="solid"
              caption={t(
                'tendersPages.tenders.tenderCard.proposals.winnerBadge',
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
                'tendersPages.tenders.tenderCard.proposals.viewDetailsCta',
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
            ?.slice(0, 3)
            .map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
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
