import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

 function Theme (props) {
     const theme = props.theme.darkMode ? darkTheme : lightTheme;
    return (
        <MuiThemeProvider theme={createMuiTheme(theme)}>
          {console.log(theme)}
            <CssBaseline />
            {props.children}
        </MuiThemeProvider>
    )
}
Theme.propTypes = {
	theme: PropTypes.object.isRequired,
  }
const mapStateToProps = (state) => ({
	theme: state.theme,
  });

  export default connect(mapStateToProps)(Theme);