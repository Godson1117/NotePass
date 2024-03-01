import React, { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Alert, Box, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography, } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import LoadingButton from '@mui/lab/LoadingButton'
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import Gauth from "./Gauth"
import { motion } from "framer-motion"
import animation from "../utils/animation"
import formStyle from "../utils/styles"

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email required"),
    password: Yup.string().min(8, "Minimum there must be 8 characters").max(16, "Password length must be within 16").required("Password required")
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      const user = await axios.post('https://notepass-api.vercel.app/auth/signup', values)
      setResult(user.data)
      setTimeout(() => {
        setLoading(false)
        setVisible(true)
      }, 3000)
      setTimeout(() => {
        setVisible(false)
      }, 5000)
    }
  });


  return (
    <>
      <Box component={motion.div} variants={animation} initial="initial" animate="animate">
        <Box
          sx={{
            height: '10px',
          }}
        >
          {visible && (
            <Alert severity={result.success ? 'success' : 'error'}>
              {result.success ? `Success - ${result.message}` : `Error - ${result.message} `}
            </Alert>
          )}
        </Box>
        <Box
          sx={{
            height: '26rem',
            width: '22rem',
            background: 'rgba(38, 50, 56, 0.2)',
            backdropFilter: 'blur(10px) saturate(120%)',
            margin: 'auto',
            marginTop: '10rem',
            borderRadius: '25px'
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
                  background: 'linear-gradient(210deg, rgba(255,0,0,1) 40%, rgba(0,255,223,1) 75%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  m: 2,
                }}
              >
                SIGN UP
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
                  fontSize: '12px'
                }}
              >
                {formik.touched.password && formik.errors.password}
              </Typography>
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
                  width: '150px',
                  height: '50px',
                  color: 'white',
                }}
              >
                JOIN NOW
              </LoadingButton>
            </Grid>
            <Grid item>
              <Gauth label="Sign Up" />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
