import {OptionSort, Book} from '@models';

export type FilterState = {
  optionMenu: string | null,
  optionSort: OptionSort | null,
  featuredItems: Book[] | []
  curHoverBook: Book | null
}
