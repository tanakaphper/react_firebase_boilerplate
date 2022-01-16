import {
  AppBar, Avatar,
  Box,
  Button,
  Divider,
  Drawer, Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar, Menu, MenuItem, Typography
} from "@mui/material";
import {useContext, useState} from "react";
import {ArrowBackIos, ExitToApp, AccountCircle} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {Link} from 'react-router-dom';
import {AuthContext} from "../../contexts/AuthProvider";
import {logout} from "../../firebase";
import {User} from "@firebase/auth-types";

const Header: React.FC = (props: any) => {
  // メニューバー開閉
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {currentUser} = useContext(AuthContext);

  const dispAvatar = (currentUser: User|null|undefined) => {
    if (
      currentUser === undefined ||
      currentUser === null ||
      ! currentUser.emailVerified
    ) {
      return (
        <></>
      );
    }
    if (currentUser && currentUser.photoURL === null) {
      return (
        <IconButton
          edge="end"
          sx={{
            color: 'white',
            position: 'absolute',
            right: "8px"
          }}
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <AccountCircle sx={{fontSize: 50}}/>
        </IconButton>
      );
    }
    if (currentUser.photoURL !== null) {
      return (
        <IconButton
          edge="end"
          sx={{
            color: 'white',
            position: 'fixed',
            right: "8px"
          }}
          onClick={handleClick}
          size="large"
        >
          <Avatar
            src={currentUser.photoURL}
          />
        </IconButton>
      );
    }
    return (
      <></>
    );
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleDrawerOpen}
            sx={{ color: 'white', position: 'absolute', zIndex:'2'}}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          {dispAvatar(currentUser)}
          <IconButton sx={{flexGrow: 1}}>
            <Avatar
              variant='square'
              sx={{width: '160px'}}
              // src='https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'
              src={`${process.env.PUBLIC_URL}/app_bar_logo.png`}
            />
            {/*<img src={`${process.env.PUBLIC_URL}/app_bar_logo.png`}></img>*/}
          </IconButton>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={menuOpen}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Avatar /> Profile
          </MenuItem>
          <Divider/>
          <MenuItem
            onClick={async () => {
              await logout();
            }}
          >
            ログアウト
          </MenuItem>
        </Menu>
      </AppBar>
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerClose}
      >
        <Box
          sx={{textAlign: 'center'}}
        >
          <IconButton
            onClick={handleDrawerClose}
          >
            <ArrowBackIos />
          </IconButton>
        </Box>
        <Divider/>
        <List>
          <ListItem
            button
            sx={{paddingLeft: '8px'}}
            key="top"
            onClick={() => {
              handleDrawerClose();
            }}
          >
            <Button
              component={Link}
              to="/"
            >
              <ListItemIcon>
                <ExitToApp/>
              </ListItemIcon>
              <ListItemText primary="トップページ"></ListItemText>
            </Button>
          </ListItem>
          <ListItem
            button
            sx={{paddingLeft: '8px'}}
            key="signin"
            onClick={() => {
              handleDrawerClose();
            }}
          >
            <Button
              component={Link}
              to="/signin"
            >
              <ListItemIcon>
                <ExitToApp/>
              </ListItemIcon>
              <ListItemText primary="ログイン"></ListItemText>
            </Button>
          </ListItem>
          <ListItem
            button
            sx={{paddingLeft: '8px'}}
            key="services"
            onClick={() => {
              handleDrawerClose();
            }}
          >
            <Button
              component={Link}
              to="/services"
            >
              <ListItemIcon>
                <ExitToApp/>
              </ListItemIcon>
              <ListItemText primary="機能一覧"></ListItemText>
            </Button>
          </ListItem>
          {process.env.REACT_APP_ENV != 'production' &&
            <ListItem
              button
              sx={{paddingLeft: '8px'}}
              key="dev"
              onClick={() => {
                handleDrawerClose();
              }}
            >
              <Button
                component={Link}
                to="/dev"
              >
                <ListItemIcon>
                  <ExitToApp/>
                </ListItemIcon>
                <ListItemText primary="開発用"></ListItemText>
              </Button>
            </ListItem>
          }
        </List>
      </Drawer>
    </>
  );
};

export default Header;
