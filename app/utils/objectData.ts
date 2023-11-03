
type Category = {
  id: number;
  label: string;
  value: string;
}
export const categoryFood: Category[] = [
  {id: 0, label: 'Choose', value: ''},
  {id: 1, label: 'Main Course', value: 'main'},
  {id: 2, label: 'Appetizer', value: 'appetizer'},
  {id: 3, label: 'Drinks', value: 'drinks'},
  {id: 4, label: 'Dishes', value: 'dishes'},
]

export type CategoryLink = {
  label: string;
  link: string;
}
export const categoryLink: CategoryLink[] = [
  { label: 'All Categories', link: '' },
  { label: 'Main Course', link: 'main' },
  { label: 'Appetizer', link: 'appetizer' },
  { label: 'Drinks', link: 'drinks' },
  { label: 'Dishes', link: 'dishes' },
]