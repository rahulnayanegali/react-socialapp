export default {
		
	palette: {
    // rgba(29,161,242,1.00)
    // #1da1f2
		primary: {
		light: '#6cd2ff',
		main: '#1da1f2',
		dark: '#0073bf',
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
		margin: '20px auto 20px auto'
	},
	pageTitle: {
		margin: '10px auto 10px auto'
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
	filledInput: {
    label: {
      "&$focusedLabel": {
        color: "tomato", 
        fontWeight: "bold"
      },
    }
		

	},

}
}