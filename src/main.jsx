import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from './App.jsx'
import { Provider } from "react-redux";
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
     <Provider store={store}>
    
      <App />

  </Provider>
  </React.StrictMode>,
)
