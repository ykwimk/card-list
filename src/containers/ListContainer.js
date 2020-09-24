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
  intersectionObserver: stores.list.intersectionObserver,
  handleObserver: stores.list.handleObserver,
  isTargetRef: stores.list.isTargetRef,
}))

@observer
class ListContainer extends React.Component {
  state = {
    productScrollY: 0,
    wishScrollY: 0,
  }

  componentDidMount() {
    const { getListData, intersectionObserver } = this.props
    getListData()
    .then(() => {
      if (this.targetRef) {
        const io = intersectionObserver()
        io.observe(this.targetRef)
      }
    })
    .catch(err => console.log(err))
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
    const { page, isTargetRef } = this.props
    return (
      <>
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
        {isTargetRef && <div ref={targetRef => (this.targetRef = targetRef)}></div>}
      </>
    )
  }
}

export default ListContainer;