import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import lightTheme from './lightTheme';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

 function Theme (props) {
   let theme = Object.assign({}, lightTheme, {
    palette: {
      ...lightTheme.palette,
      type: props.theme.darkMode ? 'dark' : 'light',
    }
   });

    return (
        <MuiThemeProvider theme={createMuiTheme(theme)}>
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