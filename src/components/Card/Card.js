import React, { useEffect, useRef, useState } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import classNames from 'classnames';
import style from './Card.scss';
import useStores from '../../useStores';

const cx = classNames.bind(style)

const Card = observer(({ item }) => {
  const { list } = useStores()
  const [ id, setId ] = useState(0)
  const [ imgSrc, setImgSrc ] = useState('')
  const [ name, setName ] = useState('')
  const [ price, setPrice ] = useState(0)
  const [ isWish, setIsWish ] = useState(false)
  const imgRef = useRef(null)

  const handleIntersection = (target, observer) => {
    observer.unobserve(target)
    target.src = target.dataset.src
  }

  const onClickChange = (id) => {
    setIsWish(!isWish)
    list.onClickToggleWishList(id)
  }

  useEffect(() => {
    const isWish = _.some(list.wishList, _.find(list.productList, (o) => o.id === item.id))
    const io = list.intersectionObserver(handleIntersection)

    io.observe(imgRef.current)

    setId(toJS(item.id))
    setImgSrc(toJS(item.imgSrc))
    setName(toJS(item.name))
    setPrice(toJS(item.price))
    setIsWish(isWish)
  }, [])

  return (
    <div className={cx('card')}>
      <div className={cx('thumbnail')}>
        <img
          ref={imgRef}
          src=""
          data-src={imgSrc}
        />
      </div>
      <div className={cx('content')}>
        <div className={cx('name')}>{name}</div>
        <div className={cx('price')}>
          {`₩ ${price.toLocaleString()}`}
        </div>
        <div className={cx('wish')}>
          <button
            type="button"
            onClick={() => onClickChange(id)}
          >
            {isWish ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  )
})

export default Card;