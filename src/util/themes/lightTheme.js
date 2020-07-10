
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
        main: '#ecf2d2',
        dark: '#babfa1',
        contrastText: '#fff',
      },
  },
  typography: {
    useNextVariants: true,																																																																																																																												
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
    width: '100%'
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
        verticalAlign: 'middle'
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
    }
  
  }
  }
  
