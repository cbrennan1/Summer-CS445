export interface AccountModel {
  uid: number;
  name: string;
  address: { street : string, zip : string };
  phone: string;
  picture: string;
  is_active: boolean;
  date_created: string;
}

/*
let now = new Date();

var address0 = ['"street": "10 West 31st ST"', '"zip": "60616"'];
var arr0 = ["<uid0>", "Virgil Bistriceanu", address0, "312-567-5146", "http://cs.iit.edu/~virgil/pictures/virgil-head-small-200811.jpg", true, now];

var address1 = ['"street": "123 2nd ST"', '"zip": "60607"'];
var arr1 = ["<uid1>", "Jane Smith", address1, "217-456-7890", "http://example.com/images/jane-smith.jpeg", false, now];

var address2 = ['"street": "101 W Main St."', '"zip": "60010"'];
var arr2 = ["<uid2>", "CSR #1",  address2, "(847) 842-8048", "http://example.com/images/jane-smith.jpeg", true, now];

var accounts = [arr0, arr1, arr2];

*/