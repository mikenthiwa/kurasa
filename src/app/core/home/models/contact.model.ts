export type name = 'Family' | 'Friend' | 'Work' | 'Other' | '';

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  contactImage: string;
  physicalAddress: string;
  isDeleted: boolean;
  category: name;
  isFavorite: boolean;
}
