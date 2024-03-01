import React, { useState } from 'react'
import { Grid, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from 'axios'
import formStyle from '../utils/styles'

const Passform = ({ setPsswds, setSuccess, handleAddFormClose, setMessage, setLoading }) => {

    const initialValues = {
        sitename: '',
        sitelink: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        sitename: Yup.string().required("Sitename required"),
        sitelink: Yup.string().required("Sitelink required"),
        password: Yup.string().required("Password required")
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setProcessing(true)
            await axios.post('https://notepass-api.vercel.app/passwords/storepassword', values, {
                headers: {
                    'authtoken': sessionStorage.getItem('authtoken')
                }
            })
            setPsswds({ ...values, date: new Date() })
            setProcessing(false)
            setMessage('Password successfully added...')
            setSuccess(true)
            handleAddFormClose()
            setLoading(true)
            setTimeout(() => setLoading(false), 2000)
        }
    })

    const [processing, setProcessing] = useState(false)

    return (
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
                <TextField
                    name="sitename"
                    label="Sitename"
                    variant="outlined"
                    size="small"
                    value={formik.values.sitename}
                    onChange={formik.handleChange}
                    error={formik.touched.sitename && formik.errors.sitename ? true : false}
                    helperText={formik.touched.sitename && formik.errors.sitename}
                    sx={formStyle}
                />
            </Grid>

            <Grid item>
                <TextField
                    name="sitelink"
                    label="Sitelink"
                    variant="outlined"
                    size="small"
                    value={formik.values.sitelink}
                    onChange={formik.handleChange}
                    error={formik.touched.sitelink && formik.errors.sitelink ? true : false}
                    helperText={formik.touched.sitelink && formik.errors.sitelink}
                    sx={formStyle}
                />
            </Grid>

            <Grid item>
                <TextField
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    size="small"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && formik.errors.password ? true : false}
                    helperText={formik.touched.password && formik.errors.password}
                    sx={formStyle}
                />
            </Grid>

            <Grid item>
                <LoadingButton
                    variant="contained"
                    size="large"
                    type="submit"
                    loading={processing}
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
                        width: '100px',
                        height: '40px',
                        color: 'white',
                    }}
                >
                    ADD
                </LoadingButton>
            </Grid>

        </Grid>
    )
}

export default Passform