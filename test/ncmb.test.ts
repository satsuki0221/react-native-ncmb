import config from './config'
import NCMB from '../src/ncmb'

test('プロパティにuserName, passwordがあればログインに成功して', () => {
  const ncmb = new NCMB(config)
  ncmb.user
    .login({
      userName: 'userName',
      password: 'password'
    })
    .then(res => {
      expect(res).toBe({})
    })
})
