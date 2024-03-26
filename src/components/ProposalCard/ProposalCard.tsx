import {
  Avatar,
  Dropdown,
  DropdownContainer,
  FlexCell,
  FlexRow,
  IconButton,
  LinkButton,
  Text,
} from '@epam/uui';
import dayjs from 'dayjs';
import Thumb from '../../images/proposalThumb.png';
import AvatarPic from '../../images/Avatar.png';
import { DropdownBodyProps, IDropdownToggler } from '@epam/uui-core';
import styles from './ProposalCard.module.scss';
import { Proposals } from '../../types';
import { ReactComponent as MailIcon } from '@epam/assets/icons/common/communication-mail-outline-18.svg';
import { ReactComponent as FacebookIcon } from '@epam/assets/icons/common/social-network-facebook-18.svg';
import { ReactComponent as InstagramIcon } from '@epam/assets/icons/common/social-network-instagram-18.svg';
import { ReactComponent as LinkedInIcon } from '@epam/assets/icons/common/linkedin-18.svg';
import { useTranslation } from 'react-i18next';

const renderDropdownBody = (props: DropdownBodyProps, name: string) => {
  const { t } = useTranslation();
  return (
    <DropdownContainer vPadding="24" padding="18" focusLock={false} {...props}>
      <FlexRow alignItems="center" spacing="12">
        <Avatar
          size="48"
          alt="avatar"
          img={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${name}&radius=50&backgroundColor=b6e3f4`}
        />

        <FlexCell width="100%">
          <Text
            cx={styles.text}
            lineHeight="24"
            fontSize="16"
            color="primary"
            fontWeight="600"
          >
            {name}
          </Text>
        </FlexCell>
      </FlexRow>
      <FlexRow>
        <FlexCell width="auto">
          <Text cx={styles.authorCardLabel}>
            {t('tendersPages.tenders.tenderCard.proposals.authorCard.company')}
          </Text>
          <Text cx={styles.authorCardLabel}>
            {t('tendersPages.tenders.tenderCard.proposals.authorCard.jobTitle')}
          </Text>
          <Text cx={styles.authorCardLabel}>
            {t('tendersPages.tenders.tenderCard.proposals.authorCard.location')}
          </Text>
        </FlexCell>
        <FlexCell width="auto">
          <Text cx={styles.authorCardContent}>Sculpture & Design Studio</Text>
          <Text cx={styles.authorCardContent}>Art Director</Text>
          <Text cx={styles.authorCardContent}>Montenegro, Herceg Novi</Text>
        </FlexCell>
      </FlexRow>
      <FlexRow>
        <IconButton
          cx={styles.socialIcon}
          icon={MailIcon}
          onClick={() => null}
        />
        <IconButton
          cx={styles.socialIcon}
          icon={FacebookIcon}
          onClick={() => null}
        />
        <IconButton
          cx={styles.socialIcon}
          icon={InstagramIcon}
          onClick={() => null}
        />
        <IconButton
          cx={styles.socialIcon}
          icon={LinkedInIcon}
          onClick={() => null}
        />
      </FlexRow>
    </DropdownContainer>
  );
};

const renderTarget = (props: IDropdownToggler, name: string) => {
  return (
    <FlexRow columnGap="6" size="24" {...props}>
      <LinkButton
        size="30"
        caption={<span className={styles.authorInfoLink}>{name}</span>}
      />
    </FlexRow>
  );
};

export const ProposalCard = ({ proposal }: { proposal: Proposals }) => {
  const { t } = useTranslation();
  return (
    <FlexRow>
      <FlexCell width="auto">
        <img src={Thumb} width="143px" />
      </FlexCell>
      <FlexCell width="auto" cx={styles.proposalDetails} alignSelf="flex-start">
        <Text cx={styles.proposalSubmissionText}>
          <span className={styles.dimmed}>
            {t('tendersPages.tenders.tenderCard.proposals.submittedOn')}
          </span>
          : {`${dayjs(Number(proposal.published)).format('D MMM YYYY')}`}
        </Text>
        <Text cx={styles.proposalTitle}>{proposal.title}</Text>
        <Text cx={styles.proposalDescription}>
          {`${proposal.description.substring(0, 120)}`}
          {proposal.description.length >= 121 && '...'}
        </Text>
        <Text cx={styles.proposalAuthor}>
          <img src={AvatarPic} />
          <span>{t('tendersPages.tenders.tenderCard.proposals.by')}</span>
          <Dropdown
            renderBody={(props) =>
              renderDropdownBody(props, proposal.ownerName)
            }
            renderTarget={(props) => renderTarget(props, proposal.ownerName)}
            closeOnMouseLeave="boundary"
          />
        </Text>
      </FlexCell>
    </FlexRow>
  );
};
