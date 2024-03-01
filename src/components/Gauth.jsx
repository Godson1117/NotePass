import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Backdrop, CircularProgress, IconButton, Typography } from '@mui/material'
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'


const Gauth = ({ label }) => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const login = useGoogleLogin({
        onSuccess: async (credResponse) => {
            setLoading(true)
            let res = await axios.post('https://notepass-api.vercel.app/auth/gauth', credResponse)
            sessionStorage.setItem('authtoken', res.data.authtoken)
            sessionStorage.setItem('profile', res.data.profile)
            setLoading(false)
            navigate('/dashboard')
        },
        onError: (error) => console.log('Login Failed:', error)
    })

    return (
        <>
            <Typography variant="subtitle2" color="white" align="center" sx={{ my: 1 }}>OR</Typography>
            <IconButton size="small" disableRipple sx={{
                '&:hover': {
                    scale: '1.1'
                }
            }} onClick={login}>
                <FcGoogle />
                <Typography color="white" sx={{
                    background: 'linear-gradient(120deg, rgba(255,0,0,1) 40%, rgba(0,255,223,1) 50%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }} marginLeft={1}>{label} with Google</Typography>
            </IconButton>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default Gauth