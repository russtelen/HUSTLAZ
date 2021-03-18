import React, { useState, useContext, useEffect, useRef } from 'react'
import UserDetail from '../../components/UserDetail/UserDetail'
import { UserContext } from '../../context/UserContext'
import { getAllUserPostings } from '../../network'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
  MenuItem,
} from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import CloseIcon from '@material-ui/icons/Close'
import { getCitiesByRegion, getAllRegions } from '../../network'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editForm: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: 600,
    height: 700,
  },
  inputs: {
    width: '80%',
    margin: 15,
  },
  photoInput: {
    display: 'none',
  },
  imagePreview: {
    maxWidth: 200,
    maxHeight: 300,
    margin: 0,
    position: 'relative',
  },
  imagePreviewHeader: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    padding: 0,
  },
}))

const UserDetailPage = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { user } = useContext(UserContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [regions, setRegions] = useState([])
  const [cities, setCities] = useState([])
  const [file, setFile] = useState()
  const [filePreview, setFilePreview] = useState()
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [postalCode, setPostalCode] = useState('')

  const deleteImage = (image) => {
    setFile(null)
    setFilePreview(null)
  }

  const getRegions = async () => {
    try {
      const regions = await getAllRegions()
      setRegions(regions)
    } catch (err) {
      console.log(err)
    }
  }

  const getCities = async (region) => {
    try {
      if (region) {
        const cities = await getCitiesByRegion(region)
        setCities(cities)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fileSelected = (event) => {
    const file = event.target.files[0]
    setFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setFilePreview(e.target.result)
    reader.readAsDataURL(file)
  }

  const usernameReference = useRef(() => {})
  usernameReference.current = user ? user.username : ''

  const [userDetail, setUserDetail] = useState({})

  useEffect(() => {
    ;(async () => {
      const res = await getAllUserPostings(usernameReference.current)
      setUserDetail(res)
      getRegions()
      if (province) {
        getCities(province)
      }
      console.log(cities)
    })()
  }, [])

  const editClicked = () => {
    setOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPostalCode(postalCode.toString().trim());
    let regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    let match = regex.exec(postalCode)
    console.log(match)
    console.log('Postal Code:', postalCode)
  }

  return (
    <div className="container">
      <h1 className="text-center m-5">My Profile</h1>
      <UserDetail user={userDetail} editClicked={() => editClicked()} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card className={classes.editForm}>
            {/* <CardHeader title="Edit Information" /> */}
            <form onSubmit={handleSubmit}>
              <input
                accept="image/*"
                className={classes.photoInput}
                onChange={fileSelected}
                id="photo-input"
                type="file"
              />
              <label htmlFor="photo-input">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              {!!file && (
                <Card className={classes.imagePreview}>
                  <CardHeader
                    className={classes.imagePreviewHeader}
                    action={
                      <IconButton aria-label="close" onClick={deleteImage}>
                        <CloseIcon />
                      </IconButton>
                    }
                  />
                  <CardMedia component="img" image={filePreview} />
                </Card>
              )}
              <TextField
                className={classes.inputs}
                id="first-name-input"
                label="First Name"
                variant="outlined"
              />
              <TextField
                className={classes.inputs}
                id="last-name-input"
                label="Last Name"
                variant="outlined"
              />
              <TextField
                className={classes.inputs}
                id="address-input"
                label="Address"
                variant="outlined"
              />
              <TextField
                variant="outlined"
                required
                select
                className={classes.inputs}
                fullWidth
                name="province"
                label="Province"
                id="province"
                value={province || ''}
                onChange={(e) => {
                  setProvince(e.target.value)
                  getCities(e.target.value)
                }}
              >
                {regions.map((region) => (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                variant="outlined"
                required
                select
                fullWidth
                name="city"
                label="City"
                id="city"
                className={classes.inputs}
                value={city || ''}
                onChange={(e) => setCity(e.target.value)}
              >
                {cities.length > 0 ? (
                  cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={''}>Choose a province</MenuItem>
                )}
              </TextField>
              <TextField
                className={classes.inputs}
                maxlength="6"
                id="postal-code-input"
                label="Postal Code"
                variant="outlined"
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <TextField
                className={classes.inputs}
                id="phone-number-input"
                label="Phone Number"
                variant="outlined"
              />
              <button>Submit</button>
            </form>
          </Card>
        </Fade>
      </Modal>
    </div>
  )
}

export default UserDetailPage
