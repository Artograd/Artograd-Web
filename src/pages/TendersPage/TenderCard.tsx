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
import { ReactComponent as ExportIcon } from '@epam/assets/icons/common/file-export-18.svg';
import { ReactComponent as MenuIcon } from '@epam/assets/icons/common/navigation-more_vert-18.svg';
import { ReactComponent as RightChevronIcon } from '@epam/assets/icons/common/navigation-chevron-right-18.svg';
import { ReactComponent as AttachmentIcon } from '@epam/assets/icons/common/file-attachment-12.svg';
import { getCategoryName } from '../../utils/getCategoryName';
import { useTranslation } from 'react-i18next';
import { Proposals } from '../../types';

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
  organization: string;
  submissionStart: string;
  submissionEnd: string;
  files: string[];
  status: string;
  category: string[];
  location: LocationType;
  expectedDelivery: string;
  title: string;
  description: string;
  proposals: Proposals[];
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
        <DropdownMenuButton caption="Export" icon={ExportIcon} />
        <DropdownMenuButton caption="Delete" icon={DeleteIcon} />
      </DropdownMenuBody>
    );
  };
  const { t } = useTranslation();
  const isProposalsExist = proposals.length === 0;
  return (
    // CARD
    <FlexRow cx={styles.wrapper}>
      {/* content */}
      <FlexCell width="100%" cx={styles.content}>
        {/* meta first row */}
        <FlexRow cx={styles.meta}>
          {/* meta */}
          <FlexCell width="auto">
            <span className={styles.dimmed}>Posted by:</span> {organization}
            <Dot />
            <span className={styles.dimmed}>Tender validity period:</span>
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
              caption={files.length}
              cx={styles.filesAmountBadge}
            />
          </FlexCell>
          <FlexSpacer />
          {/* status */}
          <FlexCell width="auto" cx={styles.status}>
            <Dot />
            {status}
          </FlexCell>
        </FlexRow>
        {/* meta second row */}
        <FlexRow cx={styles.meta}>
          {/* meta */}
          <FlexCell width="auto">
            {category.map((category) => (
              <Badge
                size="18"
                color="neutral"
                fill="solid"
                icon={AttachmentIcon}
                caption={t(`${getCategoryName(category)?.name}`)}
                cx={styles.filesAmountBadge}
              />
            ))}
            <Dot />
            {`${process.env.REACT_APP_LOCATION}, ${location.nestedLocation.name}`}
          </FlexCell>
          <FlexSpacer />
          {/* expected readiness */}
          <FlexCell width="auto">
            <span className={styles.dimmed}>Expected readiness:</span>{' '}
            {dayjs(Number(expectedDelivery)).format('D MMM YYYY')}
          </FlexCell>
        </FlexRow>
        {/* title */}
        <FlexRow cx={styles.title}>{title}</FlexRow>
        {/* description */}
        <FlexRow cx={styles.description}>{description}</FlexRow>
        {/* submitted proposals title with button */}
        <FlexRow cx={styles.proposalsLabel}>
          Submitted proposals {!isProposalsExist && `(${proposals.length})`}
          <Button
            icon={RightChevronIcon}
            iconPosition="right"
            caption="View all"
            fill="ghost"
            onClick={() => null}
            isDisabled={isProposalsExist}
          />
        </FlexRow>
        {/* proposals cards */}
        {isProposalsExist && (
          <FlexRow cx={styles.noProposalsInfoText}>
            No proposals submitted yet.
          </FlexRow>
        )}
      </FlexCell>
      {/* 3 dots menu */}
      <FlexCell cx={styles.optionsCtaWrapper}>
        <Dropdown
          renderBody={renderThirdDropdownBody}
          renderTarget={(props) => (
            <Button
              {...props}
              fill="ghost"
              icon={MenuIcon}
              size="36"
              isDropdown={false}
            />
          )}
          placement="bottom-end"
        />
      </FlexCell>
    </FlexRow>
  );
};

const Dot = () => {
  return (
    <span
      style={{
        height: '6px',
        width: '6px',
        backgroundColor: '#bbb',
        borderRadius: '50%',
        display: 'inline-block',
        margin: 'auto 6px',
      }}
    ></span>
  );
};
