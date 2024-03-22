import {
  Button,
  FlexRow,
  ModalBlocker,
  ModalFooter,
  ModalHeader,
  ModalWindow,
  Panel,
  ScrollBars,
  Text,
} from '@epam/uui';
import { IModal } from '@epam/uui-core';
import { FlexSpacer } from '@epam/uui-components';

export function ChangeAvatarModal(modalProps: IModal<string>) {
  console.log(modalProps, 333);
  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow>
        <Panel background="surface-main">
          <ModalHeader
            title="Simple modal example "
            onClose={() => modalProps.abort()}
          />
          <ScrollBars hasTopShadow hasBottomShadow>
            <FlexRow padding="24">
              <Text size="36">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus, aliquam amet animi architecto autem beatae deserunt
                distinctio eius eligendi eos eveniet exercitationem ipsa maiores
                nemo, odio quas sit vel, vero.
              </Text>
            </FlexRow>
          </ScrollBars>
          <ModalFooter>
            <FlexSpacer />
            <Button
              color="secondary"
              fill="outline"
              caption="Cancel"
              onClick={() => modalProps.abort()}
            />
            <Button
              color="accent"
              caption="Change"
              onClick={() => modalProps.success('Success action')}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
}
