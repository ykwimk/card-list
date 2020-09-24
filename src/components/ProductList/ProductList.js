import React from 'react';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import style from './ProductList.scss';
import Card from '../Card/Card';

const cx = classNames.bind(style)

@inject(stores => ({
  productList: stores.list.productList,
  productScrollY: stores.list.productScrollY,
}))

@observer
class ProductList extends React.Component {
  componentDidMount() {
    window.scrollTo(0, this.props.productScrollY)
  }

  render() {
    const { productList } = this.props
    return (
      <>
        <div className={cx('wrapper')}>
          <ul>
            {productList.map(item =>
              <li key={item.id}>
                <Card item={item} />
              </li>
            )}
          </ul>
        </div>
      </>
    )
  }
}

export default ProductList;