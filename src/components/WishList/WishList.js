import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import classNames from 'classnames';
import style from './WishList.scss';
import Card from '../Card/Card';
import useStores from '../../useStores';

const cx = classNames.bind(style)

const WishList = observer(() => {
  const { list } = useStores()
  const { wishList, wishScrollY } = list

  useEffect(() => {
    window.scrollTo(0, wishScrollY)
  }, [])

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
})

export default WishList;