
export default {																																																																																																																																																				
    palette: {
      type: 'light',
      primary: {																														
        light: '#6cd2ff',
        main: '#1da1f2',
        dark: '#0b76b8',
        contrastText: '#fff',
        },
      secondary: {
        light: '#ffffff',
        main: '#f44336',
        dark: '#babfa1',
        contrastText: '#fff',
      },
      textSecondary: {
        main: '#657786',
      },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 750,
      md: 960,
      lg: 1280,
      xl: 1400,
    },
  },
  typography: {
    useNextVariants: true,	
    fontFamily: [
      '"Ubuntu"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),																																																																																																																											
  },
  spreadIt: {
  form: {
      textAlign: 'center',
    },
    
    image: {
      margin: '20px auto auto auto'
    },
    pageTitle: {
      margin: '10px auto 10px auto',
      fontFamily: 'Ubuntu',
      fontWeight: 'bold',
      fontStyle: 'bold',
    },
    textField: {
      margin: '5px auto 5px auto',
    },
    button: {
      marginTop: 20,
      position: 'relative',
    // borderRadius: '30%',
      width: '100%',
      textTransform:'capitalize',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10 
    },
    progress: {
      position: 'absolute',
    },
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
      },
      '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
      },
      '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: '#00bcd4'
      }
      },
      '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
      },
      '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
      margin: '20px 10px'
      }
    },
    invisibleSeperator: {
      border: 'none',
      margin: 4
  } ,
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0.1)',
    marginBottom: 20,
  }
  
  }
  }
  
