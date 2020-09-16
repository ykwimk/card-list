import React from 'react';
import classNames from 'classnames';
import style from './Header.scss';

const cx = classNames.bind(style)

const Header = ({ page, sort, onClickChangeList, onSortChanged }) => {
  return (
    <header>
      <div className={cx('headerWrap')}>
        <div className={cx('sort')}>
          <select name="price" id="price" value={sort} onChange={(e) => onSortChanged(e)}>
            <option value="">기본</option>
            <option value="1">가격 높은순</option>
            <option value="2">가격 낮은순</option>
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

export default Header;