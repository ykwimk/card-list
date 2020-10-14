import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import style from './Header.scss';
import useStores from '../../useStores';

const cx = classNames.bind(style)

const Header = observer(() => {
  const { list } = useStores()
  const { page, sortOrder, onClickChangeList, onChangeSort } = list
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
})

export default Header;