const formStyle = {
    '& .MuiOutlinedInput-root': {
        '& > fieldset': {
            borderColor: '#757575',
        },
    },
    '& .MuiOutlinedInput-root:hover': {
        '& > fieldset': {
            borderColor: 'success.light',
        },
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
        '& > fieldset': {
            borderColor: 'primary.main',
        },
    },
    '& input': {
        color: 'white',
    },
    '& .MuiFormLabel-root': {
        color: 'primary.main',
    },
    '& .MuiFormLabel-root.Mui-focused': {
        color: "white",
    },
    width: '26ch'
}

export default formStyle

export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#212121',
    borderRadius: 3,
    p: 4
}