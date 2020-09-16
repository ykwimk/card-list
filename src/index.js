import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react';
import * as serviceWorker from './serviceWorker';
import ListStore from './stores/list';

const list = new ListStore()

ReactDOM.render(
  <Provider list={list}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
