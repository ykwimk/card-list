import React from 'react';
import { inject } from 'mobx-react';
import _ from 'lodash';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import classNames from 'classnames';
import style from './Card.scss';

const cx = classNames.bind(style)

@inject(stores => ({
  productList: stores.list.productList,
  wishList: stores.list.wishList,
  onClickToggleWishList: stores.list.onClickToggleWishList,
  intersectionObserver: stores.list.intersectionObserver,
}))

class Card extends React.Component {
  state = {
    id: 0,
    imgSrc: '',
    name: '',
    price: 0,
    isWish: false,
  }

  componentDidMount() {
    const { item, productList, wishList, intersectionObserver } = this.props
    this.setState({
      ...item,
      isWish: _.some(wishList, _.find(productList, (o) => o.id === this.props.item.id))? true : false,
    })
    const io = intersectionObserver(this.handleIntersection)
    io.observe(this.imgRef)
  }

  handleIntersection = (target, observer) => {
    observer.unobserve(target)
    target.src = target.dataset.src
  }

  onClickChange = (id) => {
    this.setState({ isWish: !this.state.isWish, }, () => {
      this.props.onClickToggleWishList(id)
    })
  }

  render() {
    const { id, imgSrc, name, price, isWish } = this.state
    return (
      <div className={cx('card')}>
        <div className={cx('thumbnail')}>
          <img
            ref={imgRef => (this.imgRef = imgRef)}
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
              onClick={() => this.onClickChange(id)}
            >
              {isWish ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>
      </div>
    )
  }
}


export default Card;