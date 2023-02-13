import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import { unstable_HistoryRouter as Router } from "react-router-dom";
import store from "./redux/reducer";
import { Provider } from "react-redux";
import history from './components/UnsavedChangesBlocker/History';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (module.hot) {
  module.hot.accept();
}

root.render(
  <React.StrictMode>
    <Router history={history as any}>
    <Provider store={store}>
    <App />
    </Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
