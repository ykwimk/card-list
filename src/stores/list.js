import { observable, action } from 'mobx';
import axios from 'axios';

export default class ListStore {
  @observable data = []

  @action
  getListData = () => {
    axios.get('data.json')
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err))
  }
}