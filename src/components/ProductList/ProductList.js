import React from 'react';
import classNames from 'classnames';
import style from './ProductList.scss';
import Card from '../Card/Card';

const cx = classNames.bind(style)

class ProductList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.scrollTo(0, this.props.productScrollY)
  }

  render() {
    const { page, list, wishList, onClickToggleWishList } = this.props
    return (
      <>
        <div className={cx('wrapper')}>
          <ul>
            {list.map(item =>
              <li key={item.id}>
                <Card
                  page={page}
                  list={list}
                  wishList={wishList}
                  item={item}
                  onClickToggleWishList={onClickToggleWishList}
                />
              </li>
            )}
          </ul>
        </div>
      </>
    )
  }
}

export default ProductList;