import { observable, action } from 'mobx';
import _ from 'lodash';
import axios from 'axios';

export default class ListStore {
  @observable page = 'product'
  @observable sortOrder = 'default'
  @observable productList = []
  @observable wishList = []
  @observable limit = 10
  @observable offset = 0
  @observable previousY = 0
  @observable isLoading = false

  @action
  getListData = () => {
    /*
      const options = {
        threshold: 1.0,
        root: null,
        rootMargin: "30px 0px 0px 0px",
      }
      const observer = new IntersectionObserver(this.handleObserver.bind(this), options)

      const { offset, limit } = this.state
      observer.observe(this.loadingRef)
      axios.get('data.json')
      .then(response => {
        let listData = response.data.slice(offset, limit)
        this.setState({
          list: [ ...this.state.list, ...listData ],
          isLoading: false
        })
      })
      .catch(err => console.log(err))
      observer.unobserve(this.loadingRef)
    */

    const options = {
      threshold: 1.0,
      root: null,
      rootMargin: "30px 0px 0px 0px",
    }
    const io = new IntersectionObserver(this.handleObserver, options)

    axios.get('data.json')
    .then(response => {
      this.productList = response.data.slice(this.offset, this.limit)
    })
    .catch(err => console.log(err))

  }

  @action
  handleObserver = (entries) => {
    const y = entries[0].boundingClientRect.y
    if (this.previousY > y) {
      if (this.page === 'product') {
        this.offset = this.offset + 10
        this.limit = this.limit + 10
      }
    }
    this.previousY = y
  }

  @action
  onClickChangeList = (page) => {
    if (this.page === 'product') {
      //this.setState({ productScrollY: window.scrollY })
    } else {
      //this.setState({ wishScrollY: window.scrollY })
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
}