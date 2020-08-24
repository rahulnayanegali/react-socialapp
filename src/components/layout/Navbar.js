import React from 'react';
import {changedarkMode} from '../../redux/actions/userActions';
import PropTypes from 'prop-types';
import PostTweet from '../tweet/PostTweet';
import MuiSwitch from '@material-ui/core/Switch';

//mui
import {
    AppBar, Toolbar, IconButton, Typography, Hidden,
    Drawer, CssBaseline, MenuList, MenuItem, Fab
} from '@material-ui/core'; 
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/HomeSharp';
import FaceSharpIcon from '@material-ui/icons/FaceSharp';
import { makeStyles } from '@material-ui/core/styles';

// redux
import { Link, withRouter,  } from 'react-router-dom';
import { connect } from 'react-redux';
// icons

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   marginLeft: drawerWidth,
    // },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


function Navbar(props) {
	 const [mobileOpen, setMobileOpen] = React.useState(false);
	 const [checked, setChecked] = React.useState(false);
    const classes = useStyles();
    const { children, location: {pathname} } = props;
	 // const theme = useTheme();
	 const { authenticated } = props
	const {
    credentials: { handle, 
      // createdAt, imageUrl, bio, website, location 
    }, 
		} = props.user
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
		};
	const handleChecked = (event) => {
		// event.preventDefault();
		// console.log(this.props.theme.darkMode)
		props.changedarkMode();
			//  setChecked(() => ({
			//    checked:!checked
			//  }));
      setChecked(!checked)
      setMobileOpen(false)
			}
    const drawer = (
        <div>
				{authenticated ? 
					 (
						<>
							<Hidden xsDown implementation="css">
            <div className={classes.toolbar} />
            </Hidden>
				<MenuList>
					<MenuItem component={Link} to="/" selected={'/' === pathname} onClick={() => setMobileOpen(false)}>  
					{/* <Fab color="primary" size="small">  */}
					<HomeIcon color="primary" fontSize="large" />
					{/* </Fab> */}
						Home
					</MenuItem>
					<MenuItem component={Link} to={`/users/${handle}`} selected={`/users/${handle}` === pathname} onClick={() => setMobileOpen(false)}>  
					<FaceSharpIcon color="primary" fontSize="large"/>
						Profile
					</MenuItem>
					<MenuItem>
					<PostTweet handleDrawerToggle={handleDrawerToggle} />																							
					</MenuItem>
					{/* <MenuItem component={Link} >
					<Notifications />
						Notifications
					</MenuItem> */}
				</MenuList>
						</> 
					 ) : (
						 <>
            <Hidden xsDown implementation="css">
            <div className={classes.toolbar} />
            </Hidden>
            <MenuList>
              <MenuItem  component={Link} to="/login" selected={'/login' === pathname} onClick={() => setMobileOpen(false)}>
                {/* <Button color="inherit" component={Link} to="/login">Login</Button>  */}
                Log in
              </MenuItem>
              <MenuItem  component={Link} to="/signup" selected={'/signup' === pathname} onClick={() => setMobileOpen(false)}>
              {/* <Button color="inherit" component={Link} to="/">Home</Button>  */}
                Sign up
              </MenuItem>
              <MenuItem  component={Link} to="/" selected={'/' === pathname} onClick={() => setMobileOpen(false)}>
              {/* <Button color="inherit" component={Link} to="/">Home</Button>  */}
                Home
              </MenuItem>
						 {/* <Button color="inherit" component={Link} to="/signup">Signup</Button>  */}
             {/* <MenuItem onClick={handleChecked} onClick={() => setMobileOpen(false)}> */}
             <MenuItem onClick={() => handleChecked} >
             <Fab color="default" variant="round" size="medium">
							 <MuiSwitch color="primary" checked={checked} onChange={handleChecked} />
						</Fab>
             </MenuItem>
                  </MenuList>
						 </>
					 )}
        </div>
		);
    return (
        <>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                { pathname === '/' ? 'Home' : (
                  pathname === '/login' ? 'Log in' : (
                    pathname === '/signup' ? 'Sign up' : 'Profile'
                  )
                )}
            </Typography>
            </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
            <Drawer
                // container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                paper: classes.drawerPaper,
                }}
                ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawer}
            </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
            <Drawer
                classes={{
                paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                {drawer}
            </Drawer>
            </Hidden>
        </nav>
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
        </main>
    </div>
    </>
    )
}

Navbar.propTypes = {
	window: PropTypes.func,
	user: PropTypes.object.isRequired,
	 theme: PropTypes.object.isRequired,
	//  classes: PropTypes.object.isRequired,
	 authenticated: PropTypes.bool.isRequired,
	 changedarkMode: PropTypes.func.isRequired,
 };
 
 const mapStateToProps = (state) => ({
	 theme: state.theme,
	 authenticated: state.user.authenticated,
	 user: state.user,
 
	});
 const mapActionsToProps = {
	 changedarkMode,
 }
// export default withRouter(Navbar);
export default connect(mapStateToProps, mapActionsToProps) (withRouter(Navbar));
