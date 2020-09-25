import React from 'react';
import _ from 'lodash';
import { observer, inject } from 'mobx-react';
import Header from '../components/Header/Header';
import ProductList from '../components/ProductList/ProductList';
import WishList from '../components/WishList/WishList';

@inject(stores => ({
  page: stores.list.page,
  isTargetRef: stores.list.isTargetRef,
  getListData: stores.list.getListData,
  intersectionObserver: stores.list.intersectionObserver,
  increaseData: stores.list.increaseData,
}))

@observer
class ListContainer extends React.Component {
  componentDidMount() {
    const { getListData, intersectionObserver } = this.props
    getListData()
    .then(() => {
      const io = intersectionObserver(this.handleIntersection)
      io.observe(this.targetRef)
    })
    .catch(err => console.log(err))
  }

  handleIntersection = (target, observer) => {
    const { page, increaseData, getListData } = this.props
    if (page === 'product') {
      increaseData()
      getListData()
    }
  }

  render() {
    const { page, isTargetRef } = this.props
    return (
      <>
        <Header />
        {page === 'product' ? <ProductList /> : <WishList /> }
        {isTargetRef && <div ref={targetRef => (this.targetRef = targetRef)}></div>}
      </>
    )
  }
}

export default ListContainer;