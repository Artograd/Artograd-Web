import {
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
}: TenderCardProps) => {
  const renderThirdDropdownBody = (props: DropdownBodyProps) => {
    return (
      <DropdownMenuBody {...props} rawProps={{ style: { padding: 0 } }}>
        <DropdownMenuButton caption="Export" icon={ExportIcon} />
        <DropdownMenuButton caption="Delete" icon={DeleteIcon} />
      </DropdownMenuBody>
    );
  };
  return (
    // CARD
    <FlexRow cx={styles.wrapper}>
      {/* content */}
      <FlexCell width="100%" cx={styles.content}>
        {/* meta first row */}
        <FlexRow cx={styles.meta}>
          {/* meta */}
          <FlexCell width="auto">
            <span className={styles.dimmed}>Posted by:</span> {organization} |
            <span className={styles.dimmed}>Tender validity period:</span>
            {`
              ${dayjs(Number(submissionStart)).format('D MMM YYYY')} - ${dayjs(
              Number(submissionEnd),
            ).format('D MMM YYYY')}`}{' '}
            | {files.length}
          </FlexCell>
          <FlexSpacer />
          {/* status */}
          <FlexCell width="auto">{status}</FlexCell>
        </FlexRow>
        {/* meta second row */}
        <FlexRow cx={styles.meta}>
          {/* meta */}
          <FlexCell width="auto">
            {category.map((category) => category)} |{' '}
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
        <FlexRow>Submitted proposals</FlexRow>
        {/* proposals cards */}
        <FlexRow>No proposals submitted yet.</FlexRow>
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
