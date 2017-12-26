import ncmb from 'ncmb'
import { api } from 'utils/index'

export default abstract class Core {
  ncmb: ncmb
  constructor(ncmb: ncmb) {
    this.ncmb = ncmb
  }
}
