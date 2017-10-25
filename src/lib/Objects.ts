import { Generic } from 'types/common';
import Core from 'lib/Core';

export type Create = {
  className: string,
  query: Generic,
};

export type Read_Update = {
  className: string,
  objectId: string,
  query: Generic,
};

export type Delete = {
  className: string,
  objectId: string,
};

export default class Objects extends Core {

  create(options: Create) {
    return this.ncmb.api({
      query: options.query,
      method: 'POST',
      endpoint: `classes/${options.className}/`,
      sessionToken: false,
    }).then((res: any) => {
      return res.json();
    });
  }

  read(options: Read_Update) {
    return this.ncmb.api({
      query: options.query,
      method: 'GET',
      endpoint: `classes/${options.className}/${options.objectId}`,
      sessionToken: false,
    }).then((res: any) => {
      return res.json();
    });
  }

  update(options: Read_Update) {
    return this.ncmb.api({
      query: options.query,
      method: 'PUT',
      endpoint: `classes/${options.className}/${options.objectId}`,
      sessionToken: false,
    }).then((res: any) => {
      return res.json();
    });
  }

  delete(options: Delete) {
    return this.ncmb.api({
      method: 'DELETE',
      endpoint: `classes/${options.className}/${options.objectId}`,
      sessionToken: false,
    });
  }

  search(options: Create) {
    return this.ncmb.api({
      method: 'GET',
      endpoint: `classes/${options.className}`,
      sessionToken: false,
    }).then((res: any) => {
      return res.json();
    });
  }

}
