import { FileCardItem } from '@epam/uui';

export interface CustomFileCardItem extends FileCardItem {
  /**
   * The URL path to the snapshot or thumbnail of the uploaded file.
   */
  snapPath?: string;
}
