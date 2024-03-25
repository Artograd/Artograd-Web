import { CategoryItemType } from '../types';

export const categoryList: CategoryItemType[] = [
  { id: 0, name: 'tendersPages.newTender.categories.sculptures' },
  { id: 1, name: 'tendersPages.newTender.categories.mosaics' },
  { id: 2, name: 'tendersPages.newTender.categories.murals' },
  { id: 3, name: 'tendersPages.newTender.categories.graffiti' },
  { id: 4, name: 'tendersPages.newTender.categories.functionalArt' },
  {
    id: 5,
    name: 'tendersPages.newTender.categories.interactiveInstallations',
  },
  { id: 6, name: 'tendersPages.newTender.categories.botanicalArt' },
  { id: 7, name: 'tendersPages.newTender.categories.waterFeatures' },
  { id: 8, name: 'tendersPages.newTender.categories.themedGardens' },
  { id: 9, name: 'tendersPages.newTender.categories.recycled' },
];

export const getCategoryName = (id: string) => {
  return categoryList.find((category) => category.id === Number(id));
};
