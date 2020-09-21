import React from 'react';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import style from './Header.scss';

const cx = classNames.bind(style)

@inject(stores => ({
  page: stores.list.page,
  sortOrder: stores.list.sortOrder,
  onChangeSort: stores.list.onChangeSort,
  onClickChangeList: stores.list.onClickChangeList,
}))

@observer
class Header extends React.Component {
  render() {
    const { page, sortOrder, onClickChangeList, onChangeSort } = this.props
    return (
      <header>
        <div className={cx('headerWrap')}>
          <div className={cx('sortOrder')}>
            <select
              name="price"
              value={sortOrder}
              onChange={(e) => onChangeSort(e)}
            >
              <option value="default">기본</option>
              <option value="desc">가격 높은순</option>
              <option value="asc">가격 낮은순</option>
            </select>
          </div>
          <div className={cx('buttons')}>
            <button
              type="button"
              className={cx(page === 'product' && 'active')}
              onClick={() => onClickChangeList('product')}
            >상품리스트</button>
            <button
              type="button"
              className={cx(page === 'wish' && 'active')}
              onClick={() => onClickChangeList('wish')}
            >
                위시리스트
            </button>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;