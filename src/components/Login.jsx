import React, { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material"
import { Alert } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import { Link, useNavigate } from "react-router-dom"
import HomeIcon from "@mui/icons-material/Home"
import { useFormik } from "formik"
import { motion } from 'framer-motion'
import axios from "axios"
import * as Yup from "yup"
import Gauth from "./Gauth"
import animation from "../utils/animation"
import formStyle from "../utils/styles"

const Login = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [result, setResult] = useState({})
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }


  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email required"),
    password: Yup.string().min(8, "Minimum there must be 8 characters").max(16, "Password length must be within 16").required("Password required"),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const user = await axios.post('https://notepass-api.vercel.app/auth/login', values)
        setLoading(true)
        setResult(user.data)
        setTimeout(() => {
          setLoading(false)
          setShow(true)
        }, 3000)
        setTimeout(() => {
          setShow(false)
          if (user.data.authtoken) {
            sessionStorage.setItem('authtoken', user.data.authtoken)
            sessionStorage.setItem('profile', user.data.profile)
            navigate('/dashboard')
          }
        }, 5000)
      } catch (e) {
        setResult({ success: false, message: 'Network connection Lost!' })
      }
    },
  });

  return (
    <>
      <Box component={motion.div} variants={animation} initial="initial" animate="animate">
        <Box
          sx={{
            height: '10px',
          }}
        >
          {show && (
            <Alert severity={result.success ? 'success' : 'error'}>
              {result.success ? `Success - ${result.message}` : `Error - ${result.message} `}
            </Alert>
          )}
        </Box>

        <Box
          sx={{
            height: '27rem',
            width: '22rem',
            background: 'rgba(38, 50, 56, 0.2)',
            backdropFilter: 'blur(10px) saturate(120%)',
            margin: 'auto',
            mt: '10rem',
            borderRadius: '25px',
          }}
        >
          <IconButton size="small" component={Link} to="/" disableRipple={true}>
            <HomeIcon sx={{ mt: 2, ml: 2, color: 'white' }}></HomeIcon>
          </IconButton>

          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            rowSpacing={1}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <Grid item>
              <Typography
                variant="h4"
                sx={{
                  background: 'linear-gradient(39deg, rgba(255,0,0,1) 32%, rgba(0,255,236,1) 78%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  m: 2,
                }}
              >
                LOGIN
              </Typography>
            </Grid>

            <Grid item>
              <TextField
                name="email"
                label="E-mail"
                variant="outlined"
                size="small"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && formik.errors.email ? true : false}
                helperText={formik.touched.email && formik.errors.email}
                sx={formStyle}
              />
            </Grid>

            <Grid item>
              <FormControl variant="outlined" size="small" sx={formStyle}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="primary"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && formik.errors.password ? true : false}
                />
              </FormControl>
              <Typography
                variant="body2"
                sx={{
                  ml: 2,
                  mt: 1,
                  color: 'error.main',
                  fontSize: '12px',
                }}
              >
                {formik.touched.password && formik.errors.password}
              </Typography>
            </Grid>

            <Grid container>
              <Grid
                item
                component={Link}
                to="/otp"
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  ml: 8,
                  mt: 2,
                  '&:hover': {
                    color: 'success.light',
                  },
                }}
              >
                Forgot Password?
              </Grid>
            </Grid>

            <Grid item>
              <LoadingButton
                variant="contained"
                size="large"
                type="submit"
                loading={loading}
                loadingPosition="end"
                sx={{
                  borderRadius: '8px',
                  '&:hover': {
                    background: '#009688',
                  },
                  '&:disabled': {
                    color: '#616161'
                  },
                  mt: 2,
                  width: '120px',
                  height: '40px',
                  color: 'white',
                }}
              >
                LOGIN
              </LoadingButton>
            </Grid>

            <Grid item>
              <Gauth label="Login" />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Login;
