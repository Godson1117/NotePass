import React from "react"
import { CardActionArea } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const Homepage = () => {

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            backgroundColor: 'rgba(48, 63, 159, 0)',
            backdropFilter: 'blur(10px) saturate(100%)',
          }}
        >
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, textShadow: '1px 1px white' }}
              color="error"
            >
              NOTEPASS
            </Typography>
            <Button
              color="inherit"
              component={Link}
              to="/signup"
              sx={{
                borderRadius: 50,
                '&:hover': {
                  color: '#00c853',
                  scale: '1.1'
                },
              }}
            >
              Sign Up
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                borderRadius: 50,
                '&:hover': {
                  color: '#00c853',
                  scale: '1.1'
                },
              }}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box>
        <Typography
          variant="h3"
          align="center"
          component={motion.div}
          mt={2}
          sx={{
            background: 'linear-gradient(207deg, rgba(255,0,0,1) 28%, rgba(0,255,223,1) 60%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mt: 10,
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [1, 0],
            scale: 1.2,
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            delay: 1,
          }}
        >
          Welcome to NOTEPASS
        </Typography>
        <Typography
          variant="h6"
          sx={{ textShadow: '4px 0px red' }}
          align="center"
        >
          <i>One place for your every task</i>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: 2,
            textAlign: 'center',
            background: 'radial-gradient(circle, rgba(255,0,1,1) 14%, rgba(0,255,244,1) 92%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          We understand the importance of keeping your personal and sensitive
          information secure, and we are here to provide you with a reliable
          and user-friendly solution. A web application to create, organize,
          and access your notes and passwords from anywhere, at any time.
        </Typography>
      </Box>

      <Box align="center" mt={2}>
        <Typography variant="h4" color="white">
          Our Features
        </Typography>
        <Box
          sx={{
            height: 5,
            width: 100,
            background: 'linear-gradient(48deg, rgba(255,0,0,1) 0%, rgba(255,0,234,1) 78%)',
            borderRadius: 50,
          }}
        />

        <Card
          sx={{
            maxWidth: 300,
            maxHeight: 300,
            borderRadius: 5,
            mt: 2,
            backgroundColor: 'rgba(11, 21, 26, 0.3)',
            backdropFilter: 'blur(6px) saturate(101%)',
          }}
          component={motion.div}
          initial={{
            x: '-50vw',
          }}
          whileInView={{
            x: '0vw',
            transition: {
              duration: 1,
              type: 'spring',
              bounce: 0.5,
            },
          }}
          whileHover={{
            scale: 1.1,
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="error"
              >
                Simple UI
              </Typography>
              <Typography variant="body2" color="#0097a7">
                Our user-friendly interface makes it easy to create, organize,
                and access your notes and passwords
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card
          sx={{
            maxWidth: 300,
            maxHeight: 300,
            borderRadius: 5,
            mt: 2,
            backgroundColor: 'rgba(11, 21, 26, 0.3)',
            backdropFilter: 'blur(6px) saturate(101%)',
          }}
          component={motion.div}
          initial={{
            x: '50vw',
          }}
          whileInView={{
            x: '0vw',
            transition: {
              duration: 1,
              type: 'spring',
              bounce: 0.5,
            },
          }}
          whileHover={{
            scale: 1.1,
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="error"
              >
                Three in One
              </Typography>
              <Typography variant="body2" color="#0097a7">
                A single platform where you can manage both notes and password
                with the additional benefit of password generator,where you
                can generate strong passwords according to your requirements
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card
          sx={{
            maxWidth: 300,
            maxHeight: 300,
            borderRadius: 5,
            mt: 2,
            backgroundColor: 'rgba(11, 21, 26, 0.3)',
            backdropFilter: 'blur(6px) saturate(101%)',
          }}
          component={motion.div}
          initial={{
            x: '-50vw',
          }}
          whileInView={{
            x: '0vw',
            transition: {
              duration: 1,
              type: 'spring',
              bounce: 0.5,
            },
          }}
          whileHover={{
            scale: 1.1,
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="error"
              >
                Accessibility
              </Typography>
              <Typography variant="body2" color="#0097a7">
                All datas are stored in the cloud such that you can access
                your notes and passwords anytime,anywhere with your favorite
                device including mobile phones,laptops,desktops
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card
          sx={{
            maxWidth: 300,
            maxHeight: 300,
            borderRadius: 5,
            mt: 2,
            backgroundColor: 'rgba(11, 21, 26, 0.3)',
            backdropFilter: 'blur(6px) saturate(101%)',
          }}
          component={motion.div}
          initial={{
            x: '50vw',
          }}
          whileInView={{
            x: '0vw',
            transition: {
              duration: 1,
              type: 'spring',
              bounce: 0.5,
            },
          }}
          whileHover={{
            scale: 1.1,
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="error"
              >
                Security
              </Typography>
              <Typography variant="body2" color="#0097a7">
                Our top priority is the security of your data, and we have
                implemented strict measures to ensure that your information is
                protected. So, whether you're managing your personal notes or
                your company's passwords, we've got you covered
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>

      <Typography
        variant="body1"
        color="white"
        sx={{ textAlign: 'center', mt: 2, textShadow: '2px 2px red' }}
        component={motion.div}
        animate={{
          scale: [1.1, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      >
        Join NOTEPASS now and lead a peaceful digital life
      </Typography>
    </>
  );
}

export default Homepage;
