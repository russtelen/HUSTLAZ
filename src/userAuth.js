import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: 'us-west-1_lg9Ytg6pg',
  ClientId: '61bn1juvbshul8k0850o6s5b7b',
}

const userPool = new CognitoUserPool(poolData)

export function signUp({ username, password, email }) {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ]

    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        // alert(err.message || JSON.stringify(err))
        reject(err)
        return
      }
      const cognitoUser = result.user
      resolve(cognitoUser)
    })
  })
}

export function loginUser({ username, password }) {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: username,
      Password: password,
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)
    const userData = {
      Username: username,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        const accessToken = result.getAccessToken().getJwtToken()
        resolve({ result, accessToken })
      },
      onFailure: function (err) {
        reject(err)
        // alert(err.message || JSON.stringify(err))
      },
    })
  })
}

export function currentUser() {
  return userPool.getCurrentUser()
}

export function userToken() {
  return new Promise((resolve, reject) => {
    const user = currentUser()
    if (!user) {
      reject(new Error('user not logged in'))
      return
    }
    user.getSession((err, session) => {
      if (err) {
        reject(err)
        return
      }
      resolve(session.getIdToken().getJwtToken())
    })
  })
}

export function signOut() {
  currentUser.signOut()
}
