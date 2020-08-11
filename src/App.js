import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { SET_AUTHENTICATED } from './constants/actionTypes';
import { logoutUser, getUserData } from './actions/user';

axios.defaults.baseURL =
  'https://asia-east2-tdapi-1573539397171.cloudfunctions.net/api';

const theme = createMuiTheme(themeFile);

function App() {
  const token = localStorage.getItem('FBIdToken');

  if (token) {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(logoutUser());
      window.location.href('/login');
    } else {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common['Authorization'] = token;
      store.dispatch(getUserData());
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
