import React from 'react';
import _ from 'lodash';
import { observer, inject } from 'mobx-react';
import Header from '../components/Header/Header';
import ProductList from '../components/ProductList/ProductList';
import WishList from '../components/WishList/WishList';

@inject(stores => ({
  page: stores.list.page,
  productList: stores.list.productList,
  wishList: stores.list.wishList,
  getListData: stores.list.getListData,
}))

@observer
class ListContainer extends React.Component {
  state = {
    productScrollY: 0,
    wishScrollY: 0,
  }

  componentDidMount() {
    this.props.getListData()

    /*
    const options = {
      threshold: 1.0,
      root: null,
      rootMargin: "30px 0px 0px 0px",
    }
    const observer = new IntersectionObserver(this.handleObserver.bind(this), options)
    observer.observe(this.loadingRef)
    */
  }

  /*
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
  */

  /*
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
      let productList = response.data.slice(offset, limit)
      this.setState({
        list: [ ...this.state.list, ...productList ],
        isLoading: false
      })
    })
    .catch(err => console.log(err))
    observer.unobserve(this.loadingRef)
  }
  */

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
    const { page } = this.props
    return (
      <>
        <div id="contents" ref={this.divRef}>
          <Header />
          {page === 'product'
            ? <ProductList
                productScrollY={this.state.productScrollY}
                onClickToggleWishList={this.onClickToggleWishList}
              />
            : <WishList
                wishScrollY={this.state.wishScrollY}
                onClickToggleWishList={this.onClickToggleWishList}
              />
          }
        </div>
      </>
    )
  }
}

export default ListContainer;