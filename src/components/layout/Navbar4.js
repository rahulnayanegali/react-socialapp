import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Notifications from './Notifications.js'
import PostTweet from '../tweet/PostTweet';
import {changedarkMode} from '../../redux/actions/userActions';

//redux
import { connect } from 'react-redux';
//mui
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import MuiSwitch from '@material-ui/core/Switch';
import HomeIcon from '@material-ui/icons/Home';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  ...theme.spreadIt,
  root: {
    display: 'flex',
  },
  handle: {
    textTransform: 'capitalize'
  },
  profileAvatar: {
		display: 'flex',
		justifyContent: 'space-around',
		'& > *': {
		//   margin: theme.spacing(1),
		},
	  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
    },
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
  navIcons: {
    display:'flex',
    flexDirection: 'column',
    marginLeft: '1em',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function Navbar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [checked, setChecked] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
     }
  const { authenticated } = props;
  const {
    credentials: { handle, createdAt, imageUrl, bio, website, location }, 
    } = props.user
  const drawer = (
    <div>
      {/* <div className={classes.toolbar} >
        <Typography variant="h5" align="center" >
        Account Info
        </Typography>
      </div> */}
      <Divider />
      <List>
        <ListItem>
        {/* <div className={classes.profileAvatar}> */}
        <ListItemIcon>
          <Avatar alt="Profile Image" src={imageUrl} className={classes.avatar}/>
        </ListItemIcon>
        {/* </div> */}
        <Typography className={classes.handle} variant="h5" component="h2" align="right" style={{marginLeft:'1em'}}>
						{handle}
					</Typography>
        </ListItem>
        {/* {['Home', 'Noification', 'Tweet'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
        {authenticated ? 
					 (
						<>
            {/* <div className={classes.navIcons}> */}
            <ListItem>
              <ListItemIcon> 
              <Link to="/">
                <Fab color="primary" size="medium">
                  <HomeIcon />
                </Fab>
							</Link>
              </ListItemIcon>
              <Typography variant="h6">Home</Typography>
            </ListItem>
            <ListItem>
              <ListItemIcon>
              <Fab color="primary" size="medium">
              <Notifications />
                </Fab>
              </ListItemIcon>
              <Typography variant="h6">Notifications</Typography>
            </ListItem>
              <ListItem>
              <ListItemIcon>
              <Fab color="primary" size="medium">
              <PostTweet  />																								
                </Fab>
              </ListItemIcon>
              <Typography variant="h6">Tweet</Typography>
            </ListItem>
              {/* <div className={classes.postTweet}>
              </div> */}
            {/* </div> */}
							
						</> 
					 ) : (
						 <>																																																													
						 <Button color="inherit" component={Link} to="/login">Login</Button> 
						 <Button color="inherit" component={Link} to="/">Home</Button> 
						 <Button color="inherit" component={Link} to="/signup">Signup</Button> 
						 <Fab color="default" variant="round" size="medium">
							 <MuiSwitch color="primary" checked={checked} onChange={handleChecked}/>
						</Fab>
						 </>
					 )}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="default">
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
            Home
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, 
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
      
    </div>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
  user: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
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
export default connect(mapStateToProps, mapActionsToProps)(Navbar);
