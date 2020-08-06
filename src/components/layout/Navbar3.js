import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, Typography, List, ListItem,
  withStyles, Grid, SwipeableDrawer
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
//
import { Link } from 'react-router-dom';
import NecessaryButtons from '../../util/NecessaryButtons';
import PostTweet from '../tweet/PostTweet';
import Notifications from './Notifications.js'
// importing Material UI components
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import MuiSwitch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar';
// Redux 
import {changedarkMode} from '../../redux/actions/userActions';
import { connect } from 'react-redux';
// Icons
import HomeIcon from '@material-ui/icons/Home';
//
const styleSheet = {
  list : {
    width : 200,
  },
  padding : {
    paddingRight : 30,
    cursor : "pointer",
  },
  bottomBar: {
   top: 'auto',
   bottom: 0,
  },
  sideBarIcon : {
    padding : 0,
    color : "white",
    cursor : "pointer",
    color: "primary",
  }

}

class Navbar extends Component{
  constructor(props){
    super(props);
    this.state = {drawerActivate:false, drawer:false};
    this.createDrawer = this.createDrawer.bind(this);
    this.destroyDrawer = this.destroyDrawer.bind(this);
  }

  componentWillMount(){
    if(window.innerWidth <= 600){
      this.setState({drawerActivate:true});
    }

    window.addEventListener('resize',()=>{
      if(window.innerWidth <= 600){
        this.setState({drawerActivate:true});
      }
      else{
        this.setState({drawerActivate:false})
      }
    });
  }

  //Small Screens
  createDrawer(){
    const {classes} = this.props

    return (
      <div>
        <AppBar color="inherit">
          <Toolbar>
            <Grid container direction = "row" justify = "space-between" alignItems="center">
              <MenuIcon
                className = {this.props.classes.sideBarIcon}
                onClick={()=>{this.setState({drawer:true})}} />

              <Typography color="inherit" variant = "headline">Title</Typography>
              <Typography color="inherit" variant = "headline"></Typography>
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
         open={this.state.drawer}
         onClose={()=>{this.setState({drawer:false})}}
         onOpen={()=>{this.setState({drawer:true})}}>

           <div
             tabIndex={0}
             role="button"
             onClick={()=>{this.setState({drawer:false})}}
             onKeyDown={()=>{this.setState({drawer:false})}}>

            <List className = {this.props.classes.list}>
               <ListItem key = {1} button divider> Option 1 </ListItem>
               <ListItem key = {2} button divider> Option 2 </ListItem>
               <ListItem key = {3} button divider> Option 3 </ListItem>
             </List>

         </div>
       </SwipeableDrawer>
       <AppBar className={classes.bottomBar} color="inherit">
       <Toolbar>
          {/* <Typography variant = "headline" style={{flexGrow:1}} color="inherit" >Title</Typography> */}
          <Typography variant = "subheading" className = {classes.padding} color="inherit" >OPTION 1</Typography>
          <Typography variant = "subheading" className = {classes.padding} color="inherit" >OPTION 2</Typography>
          <Typography variant = "subheading" className = {classes.padding} color="inherit" >OPTION 3</Typography>
        </Toolbar>
        </AppBar>
      </div>
    );
  }

  //Larger Screens
  destroyDrawer(){
    const {classes} = this.props
    return (
       <>
      <AppBar color="inherit">
        <Toolbar>
          <Typography variant = "headline" style={{flexGrow:1}} color="inherit" >Title</Typography>
          <Typography variant = "subheading" className = {classes.padding} color="inherit" >OPTION 1</Typography>
          <Typography variant = "subheading" className = {classes.padding} color="inherit" >OPTION 2</Typography>
          <Typography variant = "subheading" className = {classes.padding} color="inherit" >OPTION 3</Typography>
        </Toolbar>
      </AppBar>
      
      </>
    )
  }

  render(){
    return(
      <div>
        {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
      </div>
    );
  }
}

Navbar.propTypes = {
	user: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	authenticated: PropTypes.bool.isRequired,
	changedarkMode: PropTypes.func.isRequired,
  }
const mapStateToProps = (state) => ({
	theme: state.theme,
	authenticated: state.user.authenticated,
	user: state.user,

  });
const mapActionsToProps = {
	changedarkMode,
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styleSheet)(Navbar));