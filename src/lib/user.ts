import ncmb from '../ncmb';

export default class User {
  ncmb: ncmb;

  constructor(ncmb: any) {
    this.ncmb = ncmb;
  }

  login(query: {[key: string]: string}) {
    return this.ncmb.api({
      query,
      method: 'GET',
      endpoint: 'login',
      sessionToken: false,
    }).then((res: any) => {
      return res.json();
    }).then((res: any) => {
      this.ncmb.setCurrentUser(res);
      return res;
    });
  }

  logout() {
    return this.ncmb.api({
      method: 'GET',
      endpoint: 'logout',
      sessionToken: false,
    }).then(() => {
      this.ncmb.deleteCurrentUser();
    });
  }

  create(query: {[key: string]: string}) {
    return this.ncmb.api({
      query,
      method: 'GET',
      endpoint: 'logout',
      sessionToken: true,
    }).then((res: any) => {
      return res.json();
    }).then((res: any) => {
      this.ncmb.setCurrentUser(res);
      return res;
    });
  }

  update(query: {[key: string]: string}) {
    return this.ncmb.api({
      query,
      method: 'PUT',
      endpoint: `users/${this.ncmb.getCurrentUser().objectId}`,
      sessionToken: true,
    });
  }

  read() {
    return this.ncmb.api({
      method: 'PUT',
      endpoint: `users/${this.ncmb.getCurrentUser().objectId}`,
      sessionToken: true,
    });
  }

  delete() {
    return this.ncmb.api({
      method: 'DELETE',
      endpoint: `users/${this.ncmb.getCurrentUser().objectId}`,
      sessionToken: true,
    }).then(() => {
      this.ncmb.deleteCurrentUser();
    });
  }

}
