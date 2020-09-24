import React from 'react';
import { observer, inject } from 'mobx-react';

@inject(stores => ({
  handleObserver: stores.list.handleObserver,
}))

@observer
class Loading extends React.Component {
  constructor(props) {
    super(props)
    const options = {
      threshold: 1.0,
      root: null,
      rootMargin: "30px 0px 0px 0px",
    }
    this.focusObserver = new IntersectionObserver(props.handleObserver.bind(this), options)
  }
  componentDidMount() {
    //this.focusObserver.observe(this.loadingRef)
  }

  render() {
    return (
      <div ref={loadingRef => (this.loadingRef = loadingRef)}>Loading...</div>
    )
  }
}

export default Loading;