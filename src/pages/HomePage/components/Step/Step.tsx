import { FlexRow, FlexCell, Text, Panel, LinkButton } from '@epam/uui';
import styles from './Step.module.scss';

type StepProps = {
  id: number;
  title: string;
  iconOnTop: boolean;
  description: string;
  icon?: string;
  linkUrl?: string;
  linkText?: string;
};

export const Step = ({
  id,
  title,
  iconOnTop,
  icon,
  description,
  linkUrl,
  linkText,
}: StepProps) => {
  return (
    <Panel cx={styles.stepWrapper}>
      <Panel
        cx={`${styles.step} ${id === 2 && styles.offsetStart} ${
          icon && !iconOnTop && styles.offsetEnd
        }`}
      >
        <FlexRow alignItems="bottom">
          <FlexCell width="auto">
            <Text cx={styles.stepNumber}>
              {id.toString().padStart(2, '0')}.
            </Text>
            <Text cx={styles.stepTitle}>{title}</Text>
          </FlexCell>
          {iconOnTop && icon && (
            <FlexCell width="auto">
              <img src={icon} className={styles.stepIcon} />
            </FlexCell>
          )}
        </FlexRow>
        <Text cx={styles.stepDescription} size="48">
          {description}
        </Text>
        {((linkText && linkUrl) || (!iconOnTop && icon)) && (
          <FlexRow alignItems="top">
            {linkText && linkUrl && (
              <FlexCell width="auto">
                <LinkButton
                  caption={linkText}
                  link={{ pathname: linkUrl }}
                  size="42"
                  captionCX={styles.stepLink}
                />
              </FlexCell>
            )}
            {!iconOnTop && icon && (
              <FlexCell width="auto">
                <img src={icon} className={styles.stepIcon} />
              </FlexCell>
            )}
          </FlexRow>
        )}
      </Panel>
    </Panel>
  );
};
