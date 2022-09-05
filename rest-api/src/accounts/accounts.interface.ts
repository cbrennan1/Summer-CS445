export interface AccountModel {
  uid: number;
  name: string;
  address: { street : string, zip : string };
  phone: string;
  picture: string;
  is_active: boolean;
  date_created: string|Date|null;}

//Model Based off Provided Expected Response: http://cs.iit.edu/~virgil/cs445/mail.spring2022/project/test-data/test-accounts-view-accounts-GET-1-response.json
