
export default class User {
  ncmb: any;

  constructor(ncmb: any) {
    this.ncmb = ncmb;
  }

  create(query: {[key: string]: string}) {
    return this.ncmb.fetchBase({
      query,
      method: 'POST',
      endpoint: 'users',
      sessionToken: false,
    }).then((res: any) => {
      return res.json();
    }).then((res: any) => {
      this.ncmb.setCurrentUser(res);
      return res;
    });
  }

  delete() {
    return this.ncmb.fetchBase({
      method: 'DELETE',
      endpoint: `users/${this.ncmb.currentUser.objectId}`,
      sessionToken: true,
    }).then(() => {
      this.ncmb.deleteCurrentUser();
    });
  }

}
