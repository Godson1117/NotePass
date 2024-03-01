import React, { useEffect, useState } from 'react'
import { Alert, Backdrop, Box, Button, Chip, CircularProgress, Fab, Fade, Grid, IconButton, Input, Link, Modal, Paper, Snackbar, TextField, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import Noteform from './Noteform'
import formStyle from '../utils/styles'
import { modalStyle } from '../utils/styles'

const Notes = () => {

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
            updatenote(values, id)
        }
    })

    const [uploadFile, setUploadFile] = useState('')

    const handleUploadFile = (e) => {
        setUploadFile(e.target.files[0])
    }

    const [notes, setNotes] = useState([])
    const [note, setNote] = useState({})
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const [addFormOpen, setAddFormOpen] = useState(false)
    const [updateFormOpen, setUpdateFormOpen] = useState(false)
    const [id, setId] = useState('')
    const [processing, setProcessing] = useState(false)

    const handleOpen = (item) => {
        setOpen(true)
        setNote(item)
    }
    const handleClose = () => setOpen(false)

    const handleAddFormOpen = () => setAddFormOpen(true)
    const handleAddFormClose = () => setAddFormOpen(false)

    const handleUpdateFormOpen = () => setUpdateFormOpen(true)
    const handleUpdateFormClose = () => setUpdateFormOpen(false)

    const handleSuccess = (reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSuccess(false)
    }

    const getnotes = () => {
        axios.get('https://notepass-api.vercel.app/notes/fetchnotes', {
            headers: {
                'authtoken': sessionStorage.getItem('authtoken')
            }
        }).then(res => {
            setNotes(res.data)
            setLoading(false)
        }).catch(() => {

        })
    }

    const updatenote = async (values, id) => {
        setProcessing(true)
        await axios.put(`https://notepass-api.vercel.app/notes/updatenote/${id}`, { ...values, myfile: uploadFile }, {
            headers: {
                'content-type': 'multipart/form-data',
                'authtoken': sessionStorage.getItem('authtoken')
            }
        })
        setNote({ title: values.title, description: values.description, date: new Date().toDateString() })
        setProcessing(false)
        handleUpdateFormClose()
        handleClose()
        setMessage('Note successfully updated...')
        setSuccess(true)
        setLoading(true)
        getnotes()
    }

    const deletenote = async (id) => {
        await axios.delete(`https://notepass-api.vercel.app/notes/deletenote/${id}`, {
            headers: {
                'authtoken': sessionStorage.getItem('authtoken')
            }
        })
        setNotes(notes.filter((item) => item.id !== id))
        handleClose()
        setMessage('Note successfully deleted...')
        setSuccess(true)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            getnotes()
        }, 2000)
    }

    useEffect(getnotes, [])

    return (
        <>
            {notes.length === 0 && (
                <>
                    <Alert severity="info">No Notes to show...!</Alert>
                    <Alert severity="info" sx={{ mt: 1 }}>Add Notes now....</Alert>
                </>
            )}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 2
            }}
            >
                {notes.map((data) => (
                    <Box key={data.id}>
                        <Paper component={Button} onClick={() => { handleOpen(data) }} sx={{
                            width: '20rem',
                            height: '3rem',
                            backgroundColor: 'rgba(241, 243, 255, 0.1)',
                            backdropFilter: 'blur(4px) saturate(90%)',
                            borderRadius: 3,
                            color: 'white'
                        }}
                        >
                            {data.title}
                        </Paper>
                    </Box>
                ))}

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={modalStyle}>

                            <Chip label={note.date} variant="outlined" size="small" sx={{ color: '#1de9b6', didsplay: 'block', ml: 30 }} />
                            <Typography variant="h4" underline="none" sx={{ display: 'block', color: 'red' }} >{note.title}</Typography>
                            <Typography align="left" variant="body2" mt={2}>{note.description}</Typography>
                            {note.attachement && <Typography mt={2} component={Link} variant="body2" underline="none" href={`http://localhost:8000/${note.attachement}`} sx={{ display: 'block' }} >Click to see the attached file</Typography>}

                            <Box sx={{ textAlign: 'right' }}>
                                <Tooltip title="Edit">
                                    <IconButton size="small" onClick={() => {
                                        handleUpdateFormOpen()
                                        formik.values.title = note.title
                                        formik.values.description = note.description
                                        setId(note._id)
                                    }}>
                                        <EditIcon color="primary" sx={{
                                            color: 'white',
                                            '&:hover': {
                                                color: '#1976d2'
                                            }
                                        }}>
                                        </EditIcon>
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete">
                                    <IconButton size="small" onClick={() => {
                                        deletenote(note._id)
                                    }}>
                                        <DeleteIcon sx={{
                                            color: 'white',
                                            ml: 1,
                                            '&:hover': {
                                                color: 'red'
                                            }
                                        }}>
                                        </DeleteIcon>
                                    </IconButton>
                                </Tooltip>
                            </Box>

                        </Box>
                    </Fade>
                </Modal>

                {/* Add Form Model */}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={addFormOpen}
                    onClose={handleAddFormClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={addFormOpen}>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 300,
                            bgcolor: '#212121',
                            p: 4,
                            background: 'rgba(33, 33, 33, 0.5)',
                            backdropFilter: 'blur(25px) saturate(200%)',
                            borderRadius: '25px'
                        }}>
                            <Noteform setNotes={(value) => setNotes([...notes, value])} setSuccess={(value) => setSuccess(value)} handleAddFormClose={handleAddFormClose} setMessage={(mssg) => setMessage(mssg)} setLoading={(value) => setLoading(value)} getnotes={getnotes} />
                        </Box>
                    </Fade>
                </Modal>

                {/* Update Form Model */}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={updateFormOpen}
                    onClose={handleUpdateFormClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}>
                    <Fade in={updateFormOpen}>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 300,
                            bgcolor: '#212121',
                            p: 4,
                            background: 'rgba(33, 33, 33, 0.5)',
                            backdropFilter: 'blur(25px) saturate(200%)',
                            borderRadius: '25px'
                        }}>
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
                                        variant="outlined"
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
                                        variant="outlined"
                                        size="small"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.description && formik.errors.description ? true : false}
                                        helperText={formik.touched.description && formik.errors.description}
                                        sx={formStyle}
                                    />
                                </Grid>

                                <Grid item>
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
                                            width: '140px',
                                            height: '40px',
                                            color: 'white',
                                        }}
                                    >
                                        UPDATE
                                    </LoadingButton>
                                </Grid>

                            </Grid>
                        </Box>
                    </Fade>
                </Modal>

            </Box>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Tooltip title="Add Note">
                <Fab color="primary" aria-label="add" sx={{
                    m: 0,
                    top: 'auto',
                    right: 20,
                    bottom: 20,
                    left: 'auto',
                    position: 'fixed',
                    '&:hover': {
                        scale: '1.1'
                    }
                }}
                    onClick={handleAddFormOpen}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>

            <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccess}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

        </>
    )
}

export default Notes
