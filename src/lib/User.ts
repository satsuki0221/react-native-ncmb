import { Generic } from 'types/common';
import { signature, api } from 'utils/index';
import Core from 'lib/Core';

export type RequestPasswordReset = {
  mailAddress: string,
};

export default class User extends Core {

  login(query: Generic) {
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

  create(query: Generic) {
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

  update(query: Generic) {
    return this.ncmb.api({
      query,
      method: 'PUT',
      endpoint: `users/${this.ncmb.getCurrentUser().objectId}`,
      sessionToken: true,
    }).then((res: any) => {
      return res.json();
    });
  }

  read() {
    return this.ncmb.api({
      method: 'PUT',
      endpoint: `users/${this.ncmb.getCurrentUser().objectId}`,
      sessionToken: true,
    }).then((res: any) => {
      return res.json();
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

  requestMailAddressUserEntry() {
    return this.ncmb.api({
      method: 'POST',
      endpoint: 'requestMailAddressUserEntry',
      sessionToken: false,
    }).then((res: any) => {
      return res.json();
    });
  }

  requestPasswordReset(query: RequestPasswordReset) {
    return this.ncmb.api({
      query,
      method: 'POST',
      endpoint: 'requestPasswordReset',
      sessionToken: false,
    }).then((res: any) => {
      return res.json();
    });
  }
}
