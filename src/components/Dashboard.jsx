import React, { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Backdrop, Button, CircularProgress, Drawer, List, ListItem, ListItemText } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import MenuIcon from "@mui/icons-material/Menu"
import Avatar from "@mui/material/Avatar"
import Notes from "./Notes"
import Paswords from "./Passwords"
import Passgen from "./Passgen"

const Dashboard = () => {

  const pages = ['Notes', 'Passwords', 'Password Generator']
  const [open, setOpen] = useState(false)
  const [menuItem, setMenuItem] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const logout = () => {
    setLoading(true)
    setTimeout(() => {
      sessionStorage.removeItem('authtoken')
      sessionStorage.removeItem('profile')
      setLoading(false)
      navigate("/")
    }, 3000)
  }

  const genColour = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
  const color = useMemo(genColour, [])


  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)} sx={{
        '& .MuiDrawer-paper': {
          bgcolor: '#212121',
          color: '#f5f5f5',
          width: 200
        }
      }}>
        <List>
          {pages.map((item, index) => (
            <ListItem key={item} onClick={() => {
              setMenuItem(index + 1)
              setOpen(false)
            }} sx={{
              '&:hover': {
                bgcolor: '#616161',
                cursor: 'pointer'
              }
            }}>
              <ListItemText>{item}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar
          sx={{
            backgroundColor: 'rgba(48, 63, 159, 0)',
            backdropFilter: 'blur(10px) saturate(100%)',
          }}
        >

          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setOpen(!open)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>


            <Typography
              variant="h5"
              sx={{ flexGrow: 1, textShadow: '1px 1px white' }}
              color="error"
            >
              NOTEPASS
            </Typography>

            <Button
              color="inherit"
              sx={{
                borderRadius: 50,
                '&:hover': {
                  color: '#00c853',
                  scale: '1.1'
                },
              }}
              onClick={logout}
            >
              LOGOUT
            </Button>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar src={sessionStorage.getItem('profile')} sx={{ bgcolor: `${color}` }}>{sessionStorage.getItem('profile')}</Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ m: 10 }}>
        {menuItem === 1 ? <Notes /> : menuItem === 2 ? <Paswords /> : <Passgen />}
      </Box>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Dashboard;
