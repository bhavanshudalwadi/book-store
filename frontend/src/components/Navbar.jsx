import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Badge, Container, ListItemIcon, Menu, MenuItem } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Box from '@mui/material/Box';
import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartContext } from '../contexts/CartContext';

const drawerWidth = 240;

const Navbar = (props) => {
    const { window } = props;

    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { user } = useUserContext();
    const { cartCount, getCartCount } = useCartContext();

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        getCartCount();
    }, [])

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Bookstore Management
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate('/')}>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                {user && (user.role === 2 || user.role === 1) ?
                    <>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate('/books')}>
                                <ListItemText primary="Books" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate('/categories')}>
                                <ListItemText primary="Categories" />
                            </ListItemButton>
                        </ListItem>
                    </>:''
                }
                {user != null?
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate('/profile')}>
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                    </ListItem>
                :
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate('/login')}>
                            <ListItemText primary="Login" />
                        </ListItemButton>
                    </ListItem>
                }
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <nav style={{margin: 90}}>
                <AppBar component="nav">
                    <Container maxWidth="lg">

                        <Toolbar style={{padding: 0}}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { sm: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
                            >
                                Bookstore Management
                            </Typography>
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Button sx={{ color: '#fff' }} onClick={() => navigate('/')}>Home</Button>
                                {user && (user.role === 2 || user.role === 1) ?
                                    <>
                                        <Button sx={{ color: '#fff' }} onClick={() => navigate('/books')}>Books</Button>
                                        <Button sx={{ color: '#fff' }} onClick={() => navigate('/categories')}>Categories</Button>
                                    </>
                                    :''
                                }
                                <IconButton aria-label="cart" size="large">
                                    {cartCount > 0?
                                        <Badge badgeContent={cartCount} color="error">
                                            <ShoppingCartIcon htmlColor='#fff' fontSize="inherit" onClick={() => navigate('/cart')} />
                                        </Badge>
                                        :<ShoppingCartIcon htmlColor='#fff' fontSize="inherit" />
                                    }
                                </IconButton>
                                {user != null ?
                                <>
                                    <Button
                                        sx={{ color: '#fff', ml: 5 }}
                                        startIcon={<PersonRoundedIcon />}
                                        aria-controls={menuOpen ? 'basic-menu' : undefined}
                                        aria-haspopup="true" aria-expanded={menuOpen ? 'true' : undefined}
                                        onClick={handleMenuOpen}
                                    >
                                        {user.fname} {user.lname}
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={menuOpen}
                                        onClose={handleMenuClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
                                            <ListItemIcon><PersonRoundedIcon fontSize="small" /></ListItemIcon>
                                            <ListItemText>Profile</ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={() => { navigate('/addresses'); handleMenuClose(); }}>
                                            <ListItemIcon><PlaceRoundedIcon fontSize="small" /></ListItemIcon> 
                                            <ListItemText>Addresses</ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={handleMenuClose}>
                                            <ListItemIcon><FavoriteRoundedIcon fontSize="small" /></ListItemIcon> 
                                            <ListItemText>Wishlist</ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={handleMenuClose}>
                                            <ListItemIcon><LogoutRoundedIcon fontSize="small" /></ListItemIcon> 
                                            <ListItemText>Logout</ListItemText>
                                        </MenuItem>
                                    </Menu>
                                </>
                                :
                                    <Button sx={{ color: '#fff' }} onClick={() => navigate('/login')}>Login</Button>
                                }
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </nav>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    { drawer }
                </Drawer>
            </nav>
        </>
    )
}

export default Navbar;