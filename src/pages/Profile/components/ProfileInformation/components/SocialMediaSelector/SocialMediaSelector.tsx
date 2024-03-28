import styles from './SocialMediaSelector.module.scss';
import {
  FlexCell,
  FlexRow,
  LinkButton,
  PickerInput,
  TextInput,
} from '@epam/uui';
import { useTranslation } from 'react-i18next';
import { ReactComponent as PlusIcon } from '@epam/assets/icons/common/action-add-18.svg';
import { ReactComponent as DeleteIcon } from '@epam/assets/icons/common/delete-outline-18.svg';
import { useState } from 'react';
import { useArrayDataSource } from '@epam/uui-core';

const socialMedias = [
  { id: 'custom:linkedin', name: 'Linkedin' },
  { id: 'custom:facebook', name: 'Facebook' },
  { id: 'custom:instagram', name: 'Instagram' },
  { id: 'custom:others', name: 'Other' },
];

export const SocialMediaSelector = ({
  initData,
  socialMediaSelection,
}: {
  initData: any;
  socialMediaSelection: any;
}) => {
  const { t } = useTranslation();
  const initDefaultDisable = initData?.map(
    (v: { id: string; url: string }) => v.id,
  );
  const [inputFields, setInputFields] = useState(initData || []);
  const [selectable, setselectable] = useState<string[]>(
    initDefaultDisable || [],
  );

  const addField = () => {
    const newInputField = { id: '', url: '' };
    setInputFields([...inputFields, newInputField]);
  };

  const deleteField = (id: number) => {
    const data = [...inputFields];
    data.splice(id, 1);
    setInputFields(data);
    setDisabled(data);
    socialMediaSelection(data);
  };

  const data = useArrayDataSource(
    {
      items: socialMedias,
    },
    [],
  );

  const handleInputChange = (val: string, index: number) => {
    const data = [...inputFields];
    data[index].id = val;
    setInputFields(data);
    setDisabled(data);
    socialMediaSelection(data);
  };
  const onUrlChange = (val: string, index: number) => {
    const data = [...inputFields];
    data[index].url = val;
    setInputFields(data);
    socialMediaSelection(data);
  };

  const setDisabled = (data: { id: string; url: string }[]) => {
    const isSelected = data.map((v) => v.id);
    setselectable([...isSelected]);
  };

  return (
    <FlexCell width="auto" grow={1}>
      <FlexRow>
        <FlexCell width="auto" grow={1}>
          {inputFields.map((input: any, index: number) => {
            return (
              <FlexRow vPadding="12" key={index} cx={styles.inputWrapper}>
                <FlexCell width="100%" grow={1} cx={styles.pickerInputWrapper}>
                  <PickerInput
                    dataSource={data}
                    value={input.id || null}
                    onValueChange={(val: string) =>
                      handleInputChange(val, index)
                    }
                    getRowOptions={(item) => {
                      return {
                        isSelectable: !selectable.includes(item!.id),
                        isDisabled: selectable.includes(item!.id),
                      };
                    }}
                    getName={(item) => item!.name}
                    entityName="Social media"
                    selectionMode="single"
                    valueType="id"
                  />
                </FlexCell>
                <FlexCell width="100%" grow={1}>
                  <TextInput
                    value={input.url || ''}
                    onValueChange={(val: string) => onUrlChange(val, index)}
                    placeholder="https://"
                  />
                </FlexCell>
                <FlexCell>
                  <LinkButton
                    cx={styles.deleteButton}
                    icon={DeleteIcon}
                    onClick={() => deleteField(index)}
                  />
                </FlexCell>
              </FlexRow>
            );
          })}
        </FlexCell>
      </FlexRow>
      <FlexRow>
        <FlexCell width="auto" grow={1}>
          <LinkButton
            isDisabled={inputFields.length === socialMedias.length}
            caption={t('Add another')}
            icon={PlusIcon}
            onClick={addField}
          />
        </FlexCell>
      </FlexRow>
    </FlexCell>
  );
};
