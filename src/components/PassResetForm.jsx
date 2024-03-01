import React, { useState } from 'react'
import { Alert, Box, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useFormik } from "formik"
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import axios from 'axios'
import formStyle from '../utils/styles'

const PassResetForm = () => {

    const initialValues = {
        password: '',
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string().min(8, "Minimum there must be 8 characters").max(16, "Password length must be within 16").required("Password required"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            const result = await axios.post('https://notepass-api.vercel.app/passwordreset/reset', values, {
                headers: {
                    'resettoken': sessionStorage.getItem('resettoken')
                }
            })
            setLoading(false)
            setResponse(result.data)
            setTimeout(() => {
                setShow(true)
            }, 3000)
            setTimeout(() => {
                setShow(false)
                navigate('/login')
            }, 5000)
        }
    })

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [response, setResponse] = useState({})

    const navigate = useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    return (
        <>

            <Box sx={{
                height: '10px'
            }}>
                {show && <Alert severity={response.success ? 'success' : 'error'}>{response.message}</Alert>}
            </Box>

            <Box
                sx={{
                    height: '15rem',
                    width: '22rem',
                    background: 'rgba(38, 50, 56, 0.2)',
                    backdropFilter: 'blur(10px) saturate(120%)',
                    margin: 'auto',
                    mt: '15rem',
                    borderRadius: '25px',
                }}
            >
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
                            variant="h5"
                            sx={{
                                background: 'linear-gradient(39deg, rgba(255,0,0,1) 32%, rgba(0,255,236,1) 78%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                m: 2,
                            }}
                        >
                            PASSWORD RESET
                        </Typography>
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
                                width: '220px',
                                height: '40px',
                                color: 'white',
                            }}
                        >
                            RESET PASSWORD
                        </LoadingButton>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}

export default PassResetForm
