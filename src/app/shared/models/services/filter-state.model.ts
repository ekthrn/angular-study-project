import {OptionSort, OptionSearch, Book} from '@models';

export type FilterState = {
  optionMenu: string | null,
  optionSort: OptionSort | null,
  optionSearch: OptionSearch | null,
  featuredItems: Book[] | []
  curHoverBook: Book | null,
  query: string,
}
