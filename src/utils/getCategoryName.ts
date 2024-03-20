import { CategoryItemType } from '../types';

export const categoryList: CategoryItemType[] = [
  { id: 0, name: 'tendersPage.newTender.categories.sculptures' },
  { id: 1, name: 'tendersPage.newTender.categories.mosaics' },
  { id: 2, name: 'tendersPage.newTender.categories.murals' },
  { id: 3, name: 'tendersPage.newTender.categories.graffiti' },
  { id: 4, name: 'tendersPage.newTender.categories.functionalArt' },
  {
    id: 5,
    name: 'tendersPage.newTender.categories.interactiveInstallations',
  },
  { id: 6, name: 'tendersPage.newTender.categories.botanicalArt' },
  { id: 7, name: 'tendersPage.newTender.categories.waterFeatures' },
  { id: 8, name: 'tendersPage.newTender.categories.themedGardens' },
  { id: 9, name: 'tendersPage.newTender.categories.recycled' },
];

export const getCategoryName = (id: string) => {
  return categoryList.find((category) => category.id === Number(id));
};
