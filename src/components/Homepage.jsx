import React from "react"
import { CardActionArea, Grid } from "@mui/material"
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
          sx={{
            background: 'linear-gradient(120deg, rgba(255,0,0,1) 45%, rgba(0,255,223,1) 55%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mt: 10,
          }}
        >
          NOTEPASS
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ textShadow: '4px 0px red', m: 5 }}
          align="center"
        >
          <i>One place for your every task</i>
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            textAlign: 'center',
            fontStyle: 'italic',
            textShadow: '1px 0px rgba(0,255,223,1)'
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

        <Grid container justifyContent="center" spacing={2} mt={3}>
          {features.map((feature, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Card
                  sx={{
                    maxWidth: 300,
                    maxHeight: 300,
                    borderRadius: 5,
                    mt: 2,
                    backgroundColor: 'rgba(11, 21, 26, 0.3)',
                    backdropFilter: 'blur(6px) saturate(101%)',
                  }}
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" color="error">
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="#0097a7">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

const features = [
  {
    title: 'Simple UI',
    description: 'Our user-friendly interface makes it easy to create, organize, and access your notes and passwords',
  },
  {
    title: 'Three in One',
    description: 'A single platform where you can manage both notes and passwords with the additional benefit of password generator',
  },
  {
    title: 'Accessibility',
    description: 'All data are stored in the cloud, allowing you to access your notes and passwords anytime, anywhere with your favorite device.',
  },
  {
    title: 'Security',
    description: 'Our top priority is the security of your data, and we have implemented strict measures to ensure that your information is protected.',
  },
];

export default Homepage;