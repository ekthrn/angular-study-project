type Direction = 'asc' | 'desc';

export type FilterOption = OptionSort | OptionSearch;

export type OptionSort = {
  type: string,
  id: string,
  label: string,
  direction: Direction,
  isSelected?: boolean,
};

export type OptionSearch = {
  type: string,
  id: string,
  label: string,
  isSelected?: boolean,
  query?: string,
}
