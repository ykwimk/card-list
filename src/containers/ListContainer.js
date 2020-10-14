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
      io.observe(targetRef.current)
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

export default ListContainer;