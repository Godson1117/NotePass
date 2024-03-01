import React, { useState } from 'react'
import { Grid, Input, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from 'axios'
import formStyle from '../utils/styles'

const Noteform = ({ setNotes, getnotes, setSuccess, handleAddFormClose, setMessage, setLoading }) => {

    const initialValues = {
        title: '',
        description: ''
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title required"),
        description: Yup.string().required("Description required")
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setProcessing(true)
            await axios.post('https://notepass-api.vercel.app/notes/storenote', { ...values, myfile: uploadFile }, {
                headers: {
                    'content-type': 'multipart/form-data',
                    'authtoken': sessionStorage.getItem('authtoken')
                }
            })
            setNotes({ ...values, date: new Date().toDateString() })
            setProcessing(false)
            setMessage('Note successfully added...')
            setSuccess(true)
            handleAddFormClose()
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                getnotes()
            }, 2000)
        }
    })

    const [processing, setProcessing] = useState(false)
    const [uploadFile, setUploadFile] = useState('')

    const handleUploadFile = (e) => {
        setUploadFile(e.target.files[0])
    }

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            rowSpacing={1}
            component="form"
            encType="multipart/form-data"
            onSubmit={formik.handleSubmit}
        >

            <Grid item>
                <TextField
                    name="title"
                    label="Title"
                    size="small"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && formik.errors.title ? true : false}
                    helperText={formik.touched.title && formik.errors.title}
                    sx={formStyle}
                />
            </Grid>

            <Grid item>
                <TextField
                    name="description"
                    label="Description"
                    size="small"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && formik.errors.description ? true : false}
                    helperText={formik.touched.description && formik.errors.description}
                    sx={formStyle}
                />
            </Grid>

            <Grid item sx={{ ml: 1 }}>
                <Input type="file" name="myfile" sx={formStyle} onChange={handleUploadFile} />
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

export default Noteform