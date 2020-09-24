import React from 'react';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';
import classNames from 'classnames';
import style from './WishList.scss';
import Card from '../Card/Card';

const cx = classNames.bind(style)

@inject(stores => ({
  wishList: stores.list.wishList,
  wishScrollY: stores.list.wishScrollY,
}))

class WishList extends React.Component {
  componentDidMount() {
    window.scrollTo(0, this.props.wishScrollY)
  }

  render() {
    const { wishList } = this.props
    return (
      <div className={cx('wrapper')}>
        {!_.isEmpty(wishList)
          ? <ul>
              {wishList.map(item =>
                <li key={item.id}>
                  <Card item={item} />
                </li>
              )}
            </ul>
          : <div>위시 리스트에 담긴 상품이 없습니다</div>
        }
      </div>
    )
  }
}

export default WishList;