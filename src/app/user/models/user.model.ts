export interface User {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
}

// can be used with i18 like natural keys without names...
export const UserFields = [
  { field: 'firstName', name: 'Name' },
  { field: 'lastName', name: 'Last Name' },
  { field: 'position', name: 'Position' },
  { field: 'department', name: 'Department' }
];
