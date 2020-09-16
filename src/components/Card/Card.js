import React from 'react';
import _ from 'lodash';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import classNames from 'classnames';
import style from './Card.scss';

const cx = classNames.bind(style)

const options = { threshold: 0.5 }

class Card extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: this.props.page,
      id: 0,
      imgSrc: '',
      name: '',
      price: 0,
      isWish: false,
    }

    this.imgRef = React.createRef()
  }

  componentDidMount() {
    const { list, wishList } = this.props
    this.setState({ ...this.props.item }, () => {
      const { id } = this.state
      if (_.some(wishList, _.find(list, (o) => o.id === id))) {
        this.setState({ isWish: true })
      }
    })

    const observer = new IntersectionObserver(this.ioCallback, options)
    observer.observe(this.imgRef.current)
  }

  ioCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target)
        entry.target.src = entry.target.dataset.src
      }
    })
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
            ref={this.imgRef}
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