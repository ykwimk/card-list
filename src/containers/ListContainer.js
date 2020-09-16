import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import Header from '../components/Header/Header';
import ProductList from '../components/ProductList/ProductList';
import WishList from '../components/WishList/WishList';

class ListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'product',
      list: [],
      sort: '',
      limit: 10,
      offset: 0,
      wishList: [],
      previousY: 0,
      isLoading: false,
      productScrollY: 0,
      wishScrollY: 0,
    }
  }

  componentDidMount() {
    this.loadData()

    const options = {
      threshold: 1.0,
      root: null,
      rootMargin: "30px 0px 0px 0px",
    }
    const observer = new IntersectionObserver(this.handleObserver.bind(this), options)
    observer.observe(this.loadingRef)
  }

  handleObserver(entries) {
    const y = entries[0].boundingClientRect.y
    if (this.state.previousY > y) {
      if (this.state.page === 'product') {
        this.setState({
          offset: this.state.offset + 10,
          limit: this.state.limit + 10
        }, () => this.loadData())
      }
    }
    this.setState({ previousY: y })
  }

  loadData = () => {
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
  }

  onClickChangeList = (page) => {
    if (this.state.page === 'product') {
      this.setState({ productScrollY: window.scrollY })
    } else {
      this.setState({ wishScrollY: window.scrollY })
    }

    this.setState({ page, })
  }

  onSortChanged = (e) => {
    const { value } = e.target

    this.setState(prevState => {
      const list = prevState.list
      const wishList = prevState.wishList
      let sortListData
      let sortWishListData

      if (value === "1") {
        sortListData = _.orderBy(list, ['price'], ['desc'])
        sortWishListData = _.orderBy(wishList, ['price'], ['desc'])
      } else if (value === "2") {
        sortListData = _.orderBy(list, ['price'], ['asc'])
        sortWishListData = _.orderBy(wishList, ['price'], ['asc'])
      } else {
        sortListData = _.sortBy(list, ['id'])
        sortWishListData = _.sortBy(wishList, ['id'])
      }

      return {
        list: sortListData,
        wishList: sortWishListData,
        sort: value,
      }
    })
  }

  onClickToggleWishList = (id) => {
    const { list, wishList } = this.state
    if (_.some(wishList, _.find(list, (o) => o.id === id))) {
      this.setState({
        wishList: _.filter(wishList, (o) => o.id !== id)
      })
    } else {
      this.setState({
        wishList: [ ...this.state.wishList, _.find(list, (o) => o.id === id) ]
      })
    }
  }

  render() {
    return (
      <>
        <div id="contents" ref={this.divRef}>
          <Header
            page={this.state.page}
            sort={this.state.sort}
            onClickChangeList={this.onClickChangeList}
            onSortChanged={this.onSortChanged}
          />
          {this.state.page === 'product'
            ? <ProductList
                page={this.state.page}
                list={this.state.list}
                wishList={this.state.wishList}
                productScrollY={this.state.productScrollY}
                onClickToggleWishList={this.onClickToggleWishList}
              />
            : <WishList
                page={this.state.page}
                list={this.state.list}
                wishList={this.state.wishList}
                wishScrollY={this.state.wishScrollY}
                onClickToggleWishList={this.onClickToggleWishList}
              />
          }
        </div>
        <div ref={loadingRef => (this.loadingRef = loadingRef)}>
          <span style={{ display: this.state.isLoading ? 'block' : 'none' }}>Loading...</span>
        </div>
      </>
    )
  }
}

export default ListContainer;