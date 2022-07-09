import React, { useEffect, useState } from 'react'
import { Formik, Form, getIn, FieldArray } from 'formik'
import { Button, Grid, MenuItem, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
// import Axios from 'axios'
import axios from 'axios'
import Loader from '../Loader'
const apiURL = process.env.REACT_APP_API_URL

// eslint-disable-next-line react/prop-types
export default function AddAndEdit({ onClose }) {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  async function addTransaction(data) {
    data.transactions = data.transactions.map((t) => {
      return { name: users.find((u) => u._id === t.userId).name, ...t }
    })
    setLoading(true)
    try {
      await axios.post(`${apiURL}/api/transactions/add`, data)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
    onClose && onClose()
  }

  useEffect(() => {
    axios.get(`${apiURL}/api/taxUsers/get`).then(function (response) {
      setUsers(response.data?.taxUsers || [])
    })
  }, [])

  return (
    <Grid>
      <h2>Add Transactions</h2>
      {loading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{
            transactions: [{}]
          }}
          onSubmit={addTransaction}
          render={({ values, touched, errors, handleChange, handleBlur }) => (
            <Form>
              <FieldArray name='transactions'>
                {({ push, remove }) => (
                  <Grid>
                    {values.transactions.map((p, index) => {
                      const acNo = `transactions[${index}].acNo`
                      const touchedAcNo = getIn(touched, acNo)
                      const errorAcNo = getIn(errors, acNo)

                      const userId = `transactions[${index}].userId`
                      const touchedUserId = getIn(touched, userId)
                      const errorUserId = getIn(errors, userId)

                      const description = `transactions[${index}].description`
                      const touchedDescription = getIn(touched, description)
                      const errorDescription = getIn(errors, description)

                      const amount = `transactions[${index}].amount`
                      const touchedAmount = getIn(touched, amount)
                      const errorAmount = getIn(errors, amount)

                      const commision = `transactions[${index}].commision`
                      const touchedCommision = getIn(touched, commision)
                      const errorCommision = getIn(errors, commision)

                      return (
                        <Grid container key={index} spacing={2} alignItems='center'>
                          <Grid item lg={3} sm={12} md={12}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Ac. No'
                              name={acNo}
                              value={p.acNo}
                              type='number'
                              required
                              helperText={touchedAcNo && errorAcNo ? errorAcNo : ''}
                              error={Boolean(touchedAcNo && errorAcNo)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={3} sm={12} md={12}>
                            <TextField
                              id='outlined-select-currency'
                              select
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Select Name '
                              name={userId}
                              value={p.userId}
                              required
                              helperText={touchedUserId && errorUserId ? errorUserId : ''}
                              error={Boolean(touchedUserId && errorUserId)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            >
                              {(users || []).map((option) => (
                                <MenuItem key={option._id} value={option._id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item lg={3} sm={12} md={12}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Amout'
                              type='number'
                              name={amount}
                              value={p.amount}
                              required
                              helperText={touchedAmount && errorAmount ? errorAmount : ''}
                              error={Boolean(touchedAmount && errorAmount)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={3} sm={12} md={12}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Commision'
                              type='number'
                              name={commision}
                              value={p.commision}
                              required
                              helperText={touchedCommision && errorCommision ? errorCommision : ''}
                              error={Boolean(touchedCommision && errorCommision)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={6} sm={12} md={12}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Description'
                              name={description}
                              value={p.description}
                              required
                              helperText={touchedDescription && errorDescription ? errorDescription : ''}
                              error={Boolean(touchedDescription && errorDescription)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} lg={4} style={{ cursor: 'pointer' }}>
                            {index === values.transactions.length - 1 && <AddIcon onClick={() => push({ acNo: '', name: '' })} />}
                            {index !== 0 && <DeleteIcon onClick={() => remove(index)} />}
                          </Grid>
                        </Grid>
                      )
                    })}
                    <Grid container item xs={12} justifyContent='flex-end'>
                      <Button type='submit' variant='contained' color='secondary'>
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </FieldArray>
            </Form>
          )}
        />
      )}
    </Grid>
  )
}
