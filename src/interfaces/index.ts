
export interface IFormHelloProps {
  name: string;
  surname: string;
}

export enum ActiveView {
  HELLO_PAGE = 'hello-page',
  USER_PAGE = 'userlist-page'
}

export interface IUsers {
  id: number
  name: string;
  username: string;
  email: string;
  address:{
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  }
  phone: string;
  website: string; 
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface IModifyUser {
  id: number;
  name: string;
}
