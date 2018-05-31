import Models from '../models';

const {
  Item
} = Models;

export default class ItemControllers {
  static postitem(req, res) {
    console.log('posting item');
  }
}