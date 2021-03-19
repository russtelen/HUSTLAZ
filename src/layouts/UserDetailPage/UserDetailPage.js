import React, { useState, useContext, useEffect, useRef } from 'react'
import UserDetail from '../../components/UserDetail/UserDetail'
import { UserContext } from '../../context/UserContext'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import {
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
  MenuItem,
  Button,
} from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import CloseIcon from '@material-ui/icons/Close'
import {
  getCitiesByRegion,
  getAllRegions,
  getUser,
  getUserAddress,
  updateUserDetailsFileUpload,
  updateUserAddress,
  insertUserAddress
} from '../../network'
import toastr from 'toastr'
import { TopNavValueContext } from "../../context/TopNavValueContext"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1
  },
  editForm: {
    overflow: 'auto',
    width: 600,
    height: '80vh',

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
  form: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }
}))

const UserDetailPage = () => {
  const classes = useStyles()
  const [userAddress, setUserAddress] = useState({})
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
  const [imageUrl, setImageUrl] = useState('')
  const { setTopnavValue } = useContext(TopNavValueContext)
  const [userDetail, setUserDetail] = useState({})
  const provinceRef = useRef(() => {})
  provinceRef.current = province
  const setTopNavValueRef = useRef(() => {})
  setTopNavValueRef.current = setTopnavValue
  const usernameRef = useRef(() => {})
  usernameRef.current = user.username
  const userAddressRef = useRef(() => {})
  userAddressRef.current = userAddress
  const userDetailRef = useRef(() => {})
  userDetailRef.current = userDetail
  const usernameReference = useRef(() => {})
  usernameReference.current = user ? user.username : ''
  

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

  useEffect(() => {
    setTopNavValueRef.current("profile")
    ;(async () => {
      const currentUserDetails = await getUser(usernameRef.current)
      if (currentUserDetails.profilePicture) {
        setImageUrl(currentUserDetails.profilePicture)
      }
      const currentUserAddress = await getUserAddress(usernameRef.current)
      if (currentUserAddress) {
        setUserAddress(currentUserAddress)
      }
      if (userAddressRef.current) {
        setCity(userAddressRef.current.city)
        setProvince(userAddressRef.current.region)
        setPostalCode(userAddressRef.current.postalCode)
        setAddress(userAddressRef.current.street)
      }
      if (currentUserDetails) {
        setUserDetail(currentUserDetails)
      }
      if (userDetailRef.current) {
        setFirstName(userDetailRef.current.firstName)
        setLastName(userDetailRef.current.lastName)
        setPhoneNumber(userDetailRef.current.phoneNumber)
      }
      getRegions()
      if (provinceRef.current) {
        getCities(provinceRef.current)
      } else if (userAddressRef.current.region) {
        getCities(userAddressRef.current.region)
      }
    })()
  }, [open])

  const editClicked = () => {
    setOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPostalCode(postalCode.toString().trim())
    let regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/
    let match = regex.exec(postalCode)
    if (match === null) {
      toastr['error']('Invalid postal code')
      return
    } else {
      setPostalCode(match[0].replace(/\s/g, ''))
      // set invalidPostalCode to true which triggers form error
    }
    if (userAddress && Object.keys(userAddress).length > 0) {
      // update address
      await updateUserAddress({address, province, city, postalCode}, user.username)
    } else {
      // insert address
      await insertUserAddress({address, province, city, postalCode}, user.username)
    }
    await updateUserDetailsFileUpload({firstName, lastName, phoneNumber, file, imageUrl}, user.username)
    toastr['success']('Update details successfully')
    setOpen(false)
  }

  return (
    <div className="container">
      <h1 className="text-center m-5">My Profile</h1>
      <UserDetail
        userContact={userAddress}
        user={userDetail}
        editClicked={() => editClicked()}
      />
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
          <div className="container p-5 d-flex justify-content-center h-100">
          <Card className={classes.editForm}>
            <h3 className="mt-5 text-center">Edit Information</h3>
            <form className={classes.form}>
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
                value={firstName || ''}
                variant="outlined"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                className={classes.inputs}
                value={lastName || ''}
                id="last-name-input"
                label="Last Name"
                variant="outlined"
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                className={classes.inputs}
                id="address-input"
                value={address || ''}
                label="Address"
                variant="outlined"
                onChange={(e) => setAddress(e.target.value)}
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
                id="postal-code-input"
                label="Postal Code"
                variant="outlined"
                value={postalCode || ''}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <TextField
                className={classes.inputs}
                value={phoneNumber || ''}
                id="phone-number-input"
                label="Phone Number"
                variant="outlined"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button variant="contained" className="mb-5" onClick={handleSubmit} color={'secondary'}>Submit</Button>
            </form>
            
          </Card>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default UserDetailPage
