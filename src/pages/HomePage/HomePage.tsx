import { FlexRow, FlexCell, Text, Panel, Button } from '@epam/uui';
import styles from './HomePage.module.scss';
import DragAndDropIcon from '../../images/draganddrop.svg';
import EmptyIcon from '../../images/empty.svg';
import LaptopIcon from '../../images/laptop.svg';
import { Step } from './components/Step/Step';
import { useTranslation, Trans } from 'react-i18next';

const cognitoSignUpUrl = `${
  process.env.REACT_APP_REGISTER_URL
}&redirect_uri=${encodeURIComponent(
  window.location.origin + process.env.REACT_APP_REDIRECT_PAGE ?? '',
)}`;

export const HomePage = () => {
  const { t } = useTranslation();
  const steps = [
    {
      id: 1,
      linkUrl: '/tenders',
      icon: undefined,
      iconOnTop: false,
    },
    {
      id: 2,
      linkUrl: '/submit',
      icon: DragAndDropIcon,
      iconOnTop: true,
    },
    {
      id: 3,
      linkUrl: '/projects',
      icon: LaptopIcon,
      iconOnTop: false,
    },
    {
      id: 4,
      linkUrl: '/invest',
      icon: EmptyIcon,
      iconOnTop: false,
    },
    {
      id: 5,
      linkUrl: '/donate',
      icon: undefined,
      iconOnTop: false,
    },
  ];

  return (
    <>
      <Panel cx={styles.headerWrapper}>
        <FlexRow alignItems="center">
          <FlexCell width="100%" textAlign="center" alignSelf="center">
            <Text cx={styles.headerTitle} fontWeight="600">
              {t('homepage.header.title')}
            </Text>
            <Text cx={styles.headerSubTitle} fontWeight="600">
              <Trans i18nKey="homepage.header.subtitle" />
            </Text>
            <FlexRow cx={styles.headerCta}>
              <Button
                rawProps={{ 'data-testid': `join-community-cta` }}
                caption={t('homepage.header.cta')}
                href={cognitoSignUpUrl}
              />
            </FlexRow>
          </FlexCell>
        </FlexRow>
      </Panel>

      <FlexCell width="100%" cx={styles.steps}>
        <Text cx={styles.stepsTitle} fontWeight="700">
          {t('homepage.steps.sectionTitle')}
        </Text>

        <FlexRow cx={styles.stepsSection}>
          <FlexCell width="auto" cx={styles.desktop}>
            {steps
              .filter((step) => step.id % 2 === 1)
              .map((step) => (
                <Step
                  key={step.id}
                  id={step.id}
                  title={t(`homepage.steps.stepTitle${step.id}`)}
                  iconOnTop={step.iconOnTop}
                  icon={step.icon}
                  description={t(`homepage.steps.stepDescription${step.id}`)}
                  linkUrl={step.linkUrl}
                  linkText={t(`homepage.steps.stepLinkText${step.id}`)}
                />
              ))}
          </FlexCell>
          <FlexCell width="auto" cx={styles.desktop}>
            {steps
              .filter((step) => step.id % 2 === 0)
              .map((step) => (
                <Step
                  key={step.id}
                  id={step.id}
                  title={t(`homepage.steps.stepTitle${step.id}`)}
                  iconOnTop={step.iconOnTop}
                  icon={step.icon}
                  description={t(`homepage.steps.stepDescription${step.id}`)}
                  linkUrl={step.linkUrl}
                  linkText={t(`homepage.steps.stepLinkText${step.id}`)}
                />
              ))}
          </FlexCell>
          <FlexCell width="auto" cx={styles.mobile}>
            {steps.map((step) => (
              <Step
                key={step.id}
                id={step.id}
                title={t(`homepage.steps.stepTitle${step.id}`)}
                iconOnTop={step.iconOnTop}
                icon={step.icon}
                description={t(`homepage.steps.stepDescription${step.id}`)}
                linkUrl={step.linkUrl}
                linkText={t(`homepage.steps.stepLinkText${step.id}`)}
              />
            ))}
          </FlexCell>
        </FlexRow>
      </FlexCell>
    </>
  );
};
