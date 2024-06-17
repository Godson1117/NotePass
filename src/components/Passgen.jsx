import React, { useState } from 'react'
import { Alert, Box, Grid } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import '../App.css'

const numbers = '0123456789'
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é"

const Passgen = () => {

  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [show, setShow] = useState(false)
  const [feedback, setFeedback] = useState({ success: false, message: '' })

  const handleGeneratePassword = (e) => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      setFeedback({ success: false, message: 'You must select atleast one option !' })
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000)
    }
    let characterList = ''

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters
    }

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (includeNumbers) {
      characterList = characterList + numbers
    }

    if (includeSymbols) {
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))
  }
  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    // const newTextArea = document.createElement('textarea')
    // newTextArea.innerText = password
    // document.body.appendChild(newTextArea)
    // newTextArea.select()
    // document.execCommand('copy')
    // newTextArea.remove()
    navigator.clipboard.writeText(password)
  }

  const handleCopyPassword = (e) => {
    if (password === '') {
      setFeedback({ success: false, message: 'Nothing to Copy !' })
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000)
    } else {
      copyToClipboard()
      setShow(true)
      setFeedback({ success: true, message: 'Password successfully copied to clipboard' })
      setTimeout(() => {
        setShow(false)
      }, 3000);
    }
  }


  return (
    <Box>
      <Box sx={{
        height: '10px',
      }}>
        {show && <Alert severity={feedback.success ? 'success' : 'error'}>{feedback.message}</Alert>}
      </Box>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        rowSpacing={1}>

        <Grid item>
          <div className='container'>
            <div className='generator'>
              <h2 className='generator__header'>Password Generator</h2>
              <div className='generator__password'>
                <h3 style={{ margin: 'auto' }}>{password}</h3>
                <button onClick={handleCopyPassword} className='copy__btn'>
                  <ContentCopyIcon />
                </button>
              </div>

              <div className='form-group'>
                <label htmlFor='password-strength'>Password length</label>
                <input
                  defaultValue={passwordLength}
                  onChange={(e) => setPasswordLength(e.target.value)}
                  type='number'
                  id='password-strength'
                  name='password-strength'
                  max='16'
                  min='8'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='uppercase-letters'>Include Uppercase Letters</label>
                <input
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  type='checkbox'
                  id='uppercase-letters'
                  name='uppercase-letters'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='lowercase-letters'>Include Lowercase Letters</label>
                <input
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  type='checkbox'
                  id='lowercase-letters'
                  name='lowercase-letters'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='include-numbers'>Include Numbers</label>
                <input
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  type='checkbox'
                  id='include-numbers'
                  name='include-numbers'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='include-symbols'>Include Symbols</label>
                <input
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  type='checkbox'
                  id='include-symbols'
                  name='include-symbols'
                />
              </div>

              <button onClick={handleGeneratePassword} className='generator__btn'>
                Generate Password
              </button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Passgen
