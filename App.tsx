import * as React from 'react';
import { Provider } from 'react-redux';

import Root from './src/Root';
import store from './src/store';

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

export default App;
