import React, { useState } from 'react'
import { Grid, Paper } from '@mui/material'
import { useEffect } from 'react'
import axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL
import { useParams } from 'react-router-dom'
import Loader from '../Loader'

export default function UsersList() {
  const [user, setUser] = useState(null)
  // let navigate = useNavigate()

  // function goToTheRoute(route) {
  //   navigate(route)
  // }
  let { userId } = useParams()
  useEffect(() => {
    axios.get(`${apiURL}/api/taxUsers/get?userId=${userId}`).then(function (response) {
      setUser(response.data?.user || {})
    })
  }, [])
  console.log(userId, user)
  return (
    <Grid style={{ padding: '5%', paddingLeft: '20%', paddingRight: '20%', textAlign: 'center' }}>
      {user ? (
        <Paper elevation={4} style={{ padding: '4rem' }}>
          <div>
            <b>User Name : {user.name}</b>
          </div>
          <div>
            <b>Created At : {new Date(user.date).toLocaleString()}</b>
          </div>
        </Paper>
      ) : (
        <Loader />
      )}
    </Grid>
  )
}
