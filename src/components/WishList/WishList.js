import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import style from './WishList.scss';
import Card from '../Card/Card';

const cx = classNames.bind(style)

class WishList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.scrollTo(0, this.props.wishScrollY)
  }

  render() {
    const { page, list, wishList, onClickToggleWishList } = this.props
    return (
      <div className={cx('wrapper')}>
        {!_.isEmpty(wishList)
          ? <ul>
              {wishList.map(item =>
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
          : <div>위시 리스트에 담긴 상품이 없습니다</div>
        }
      </div>
    )
  }
}

export default WishList;