import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';

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

const theme = createMuiTheme(themeFile);

function App() {
  let authenticated = false;

  const token = localStorage.getItem('FBIdToken');

  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);

    if (decodedToken.exp * 1000 < Date.now()) {
      // window.location.href("/login");
      authenticated = false;
    } else {
      authenticated = true;
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
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={signup}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
