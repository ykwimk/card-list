import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import style from './ProductList.scss';
import Card from '../Card/Card';
import useStores from '../../useStores';

const cx = classNames.bind(style)

const ProductList = observer(() => {
  const { list } = useStores()

  useEffect(() => {
    window.scrollTo(0, list.productScrollY)
  }, [])

  return (
    <div className={cx('wrapper')}>
      <ul>
        {list.productList.map(item =>
          <li key={item.id}>
            <Card item={item} />
          </li>
        )}
      </ul>
    </div>
  )
})

export default ProductList;