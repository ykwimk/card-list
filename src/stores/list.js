import { observable, action } from 'mobx';
import _ from 'lodash';
import axios from 'axios';

export default class ListStore {
  @observable page = 'product'
  @observable sortOrder = 'default'
  @observable dataLength = 0
  @observable productList = []
  @observable wishList = []
  @observable limit = 10
  @observable offset = 0
  @observable previousY = 0
  @observable isTargetRef = false
  @observable productScrollY = 0
  @observable wishScrollY = 0

  @action
  getListData = () => {
    if (this.dataLength !== 0 && this.productList.length !== 0 && this.dataLength === this.productList.length) return null
    return axios.get('data.json')
      .then(response => {
        const sliceProductList = response.data.slice(this.offset, this.limit)
        this.productList = [ ...this.productList, ...sliceProductList ]
        this.isTargetRef = true
        this.dataLength = response.data.length
      })
      .catch(err => console.log(err))
  }

  @action
  increaseData = () => {
    if (this.page === 'product') {
      this.offset = this.offset + 10
      this.limit = this.limit + 10
    }
  }

  @action
  intersectionObserver = (handleIntersection) => {
    const options = { threshold: 1.0, root: null }
    return new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          handleIntersection(entry.target, observer)
        }
      })
    }, options)
  }

  @action
  onClickChangeList = (page) => {
    if (this.page === 'product') {
      this.productScrollY = window.scrollY
    } else {
      this.wishScrollY = window.scrollY
    }

    this.page = page
  }

  @action
  onChangeSort = (e) => {
    const { value } = e.target

    this.sortOrder = value

    if (value === "default") {
      this.productList = _.sortBy(this.productList, ['id'])
      this.wishList = _.sortBy(this.wishList, ['id'])
    } else {
      this.productList = _.orderBy(this.productList, ['price'], [value])
      this.wishList = _.orderBy(this.wishList, ['price'], [value])
    }
  }

  @action
  onClickToggleWishList = (id) => {
    if (_.some(this.wishList, _.find(this.productList, (o) => o.id === id))) {
      this.wishList = _.filter(this.wishList, (o) => o.id !== id)
    } else {
      this.wishList = [ ...this.wishList, _.find(this.productList, (o) => o.id === id) ]
    }
  }
}