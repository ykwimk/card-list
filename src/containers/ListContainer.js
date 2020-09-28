import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import { observer } from 'mobx-react';
import Header from '../components/Header/Header';
import ProductList from '../components/ProductList/ProductList';
import WishList from '../components/WishList/WishList';
import useStores from '../useStores';

const ListContainer = observer(() => {
  const { list } = useStores()
  const targetRef = useRef(null)

  const handleIntersection = () => {
    if (list.page === 'product') {
      list.increaseData()
      list.getListData()
    }
  }

  useEffect(() => {
    list.getListData()
    .then(() => {
      const io = list.intersectionObserver(handleIntersection)
      io.observe(targetRef)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <>
      <Header />
      {list.page === 'product' ? <ProductList /> : <WishList /> }
      {list.isTargetRef && <div ref={targetRef}></div>}
    </>
  )
})

/*
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
*/

export default ListContainer;