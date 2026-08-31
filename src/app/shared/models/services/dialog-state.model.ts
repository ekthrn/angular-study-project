import {Book} from '@models';

export type DialogState = {
  isOpened: boolean,
  isClosed: boolean,
  dataBook: Book | null,
}
