import React, { useEffect, useState } from 'react'
import { Formik, Form, getIn, FieldArray } from 'formik'
import { Button, Grid, MenuItem, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import axios from 'axios'
import Loader from '../Loader'
const apiURL = process.env.REACT_APP_API_URL

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function AddAndEdit({ onClose }) {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  async function addSaleTransaction(data) {
    data.transactions = data.transactions.map((t) => {
      return { name: users.find((u) => u._id === t.userId).name, ...t }
    })
    setLoading(true)
    try {
      await axios.post(`${apiURL}/api/saleTransactions/add`, data)
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

  const operators = {
    '+': function (a, b) {
      return parseInt(a) + parseInt(b)
    },
    x: function (a, b) {
      return parseInt(a) * parseInt(b)
    },
    '-': function (a, b) {
      return parseInt(a) - parseInt(b)
    },
    '/': function (a, b) {
      return parseInt(a) / parseInt(b)
    }
  }

  return (
    <Grid>
      <h2>Add Sale Transactions</h2>
      {loading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{
            transactions: [{}]
          }}
          onSubmit={addSaleTransaction}
          render={({ values, touched, errors, handleChange, handleBlur, setFieldValue }) => (
            <Form>
              <FieldArray name='transactions'>
                {({ push, remove }) => (
                  <Grid>
                    {values.transactions.map((p, index) => {
                      const date = `transactions[${index}].date`
                      const touchedAcNo = getIn(touched, date)
                      const errorAcNo = getIn(errors, date)

                      const userId = `transactions[${index}].userId`
                      const touchedUserId = getIn(touched, userId)
                      const errorUserId = getIn(errors, userId)

                      const description = `transactions[${index}].description`
                      const touchedDescription = getIn(touched, description)
                      const errorDescription = getIn(errors, description)

                      const quantity = `transactions[${index}].quantity`
                      const touchedQuantity = getIn(touched, quantity)
                      const errorQuantity = getIn(errors, quantity)

                      const purchase = `transactions[${index}].purchase`
                      const touchedPurchase = getIn(touched, purchase)
                      const errorPurchase = getIn(errors, purchase)

                      const sign = `transactions[${index}].sign`
                      const touchedSign = getIn(touched, sign)
                      const errorSign = getIn(errors, sign)

                      const sale = `transactions[${index}].sale`
                      const touchedSale = getIn(touched, sale)
                      const errorSale = getIn(errors, sale)

                      const finalQuantity = `transactions[${index}].finalQuantity`
                      const touchedFinalQuantity = getIn(touched, finalQuantity)
                      const errorFinalQuantity = getIn(errors, finalQuantity)

                      const finalType = `transactions[${index}].finalType`

                      const finalSaleAndPurchase = `transactions[${index}].finalSaleAndPurchase`
                      const touchedFinalSaleAndPurchase = getIn(touched, finalSaleAndPurchase)
                      const errorFinalSaleAndPurchase = getIn(errors, finalSaleAndPurchase)

                      function setFinalQuantity(quantity, finalSAndP) {
                        if (quantity > finalSAndP) {
                          setFieldValue(finalType, 'sale')
                          setFieldValue(finalQuantity, parseInt(quantity) - parseInt(finalSAndP))
                        } else {
                          setFieldValue(finalType, 'purchase')
                          setFieldValue(finalQuantity, parseInt(finalSAndP) - parseInt(quantity))
                        }
                      }

                      function handleSign(e) {
                        if (e.target.value === '=') {
                          let v =
                            values.transactions[index].sale ||
                            values.transactions[index].purchase ||
                            values.transactions[index].finalSaleAndPurchase ||
                            0
                          setFieldValue(finalSaleAndPurchase, v)
                          setFieldValue(sale, v)
                          setFieldValue(purchase, v)
                          if (values.transactions[index].quantity) {
                            setFinalQuantity(
                              values.transactions[index].quantity,
                              values.transactions[index].sale || values.transactions[index].purchase || 0
                            )
                          }
                        } else if (!values.transactions[index].sale || !values.transactions[index].purchase) {
                          console.log('')
                        } else {
                          setFieldValue(
                            finalSaleAndPurchase,
                            operators[e.target.value](values.transactions[index].sale, values.transactions[index].purchase)
                          )
                          setFinalQuantity(
                            values.transactions[index].quantity,
                            operators[e.target.value](values.transactions[index].sale, values.transactions[index].purchase)
                          )
                        }
                      }

                      function handleSale(e) {
                        if (!values.transactions[index].sign || !values.transactions[index].purchase) return
                        else if (values.transactions[index].sign !== '=') {
                          setFieldValue(
                            finalSaleAndPurchase,
                            operators[values.transactions[index].sign](e.target.value, values.transactions[index].purchase)
                          )
                          setFinalQuantity(
                            values.transactions[index].quantity,
                            operators[values.transactions[index].sign](e.target.value, values.transactions[index].purchase)
                          )
                        } else if (values.transactions[index].sign === '=') {
                          setFieldValue(finalSaleAndPurchase, e.target.value)
                          setFieldValue(purchase, e.target.value)
                          setFinalQuantity(values.transactions[index].quantity, e.target.value)
                        }
                      }

                      function handlePurchase(e) {
                        if (!values.transactions[index].sign || !values.transactions[index].sale) return
                        else if (values.transactions[index].sign !== '=') {
                          setFieldValue(
                            finalSaleAndPurchase,
                            operators[values.transactions[index].sign](values.transactions[index].sale, e.target.value)
                          )
                          setFinalQuantity(
                            values.transactions[index].quantity,
                            operators[values.transactions[index].sign](values.transactions[index].sale, e.target.value)
                          )
                        } else if (values.transactions[index].sign === '=') {
                          setFieldValue(finalSaleAndPurchase, e.target.value)
                          setFieldValue(sale, e.target.value)
                          setFinalQuantity(values.transactions[index].quantity, e.target.value)
                        }
                      }

                      function handleQuantity(e) {
                        if (values.transactions[index].finalSaleAndPurchase) {
                          setFinalQuantity(e.target.value, values.transactions[index].finalSaleAndPurchase)
                        }
                      }

                      return (
                        <Grid container key={index} spacing={2} alignItems='basline'>
                          <Grid item lg={2} sm={12} md={12}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Date'
                              name={date}
                              value={p.date || new Date()}
                              type='date'
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
                          <Grid item lg={4} sm={12} md={12}>
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
                          <Grid item lg={3} sm={12} md={12}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Final Quantity'
                              type='number'
                              name={finalQuantity}
                              value={p.finalQuantity || 0}
                              helperText={'Auttomatically Calculated'}
                              error={Boolean(touchedFinalQuantity && errorFinalQuantity)}
                              disabled
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={2} sm={12} md={12}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Quantity'
                              type='number'
                              name={quantity}
                              value={p.quantity || ''}
                              required
                              helperText={touchedQuantity && errorQuantity ? errorQuantity : ''}
                              error={Boolean(touchedQuantity && errorQuantity)}
                              onChange={(e) => {
                                handleChange(e)
                                handleQuantity(e)
                              }}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={2} sm={4} md={4}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Sale'
                              type='number'
                              name={sale}
                              value={p.sale || ''}
                              required
                              helperText={touchedSale && errorSale ? errorSale : ''}
                              error={Boolean(touchedSale && errorSale)}
                              onChange={(e) => {
                                handleChange(e)
                                handleSale(e)
                              }}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={0.5} sm={2} md={2}>
                            <TextField
                              select
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label=''
                              name={sign}
                              value={p.sign}
                              required
                              helperText={touchedSign && errorSign ? errorSign : ''}
                              error={Boolean(touchedSign && errorSign)}
                              onChange={(e) => {
                                handleChange(e)
                                handleSign(e)
                              }}
                              onBlur={handleBlur}
                              size='small'
                            >
                              {[
                                { value: '+', name: '+' },
                                { value: '-', name: '-' },
                                { value: 'x', name: 'X' },
                                { value: '/', name: '/' },
                                { value: '=', name: '=' }
                              ].map((option) => (
                                <MenuItem key={option.value} value={option.value} style={{ fontWeight: 600 }}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item lg={2} sm={4} md={4}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Purchase'
                              type='number'
                              name={purchase}
                              value={p.purchase || ''}
                              required
                              helperText={touchedPurchase && errorPurchase ? errorPurchase : ''}
                              error={Boolean(touchedPurchase && errorPurchase)}
                              fast={false}
                              onChange={(e) => {
                                handleChange(e)
                                handlePurchase(e)
                              }}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={2.5} sm={12} md={12}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Final Sale And Purchase Value'
                              type='number'
                              name={finalSaleAndPurchase}
                              value={p.finalSaleAndPurchase || 0}
                              required
                              disabled
                              helperText={'Auttomatically Calculated'}
                              error={Boolean(touchedFinalSaleAndPurchase && errorFinalSaleAndPurchase)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={1} sm={12} md={12} style={{ cursor: 'pointer', marginTop: '0.8rem' }}>
                            <IconButton color='secondary'>
                              {index === values.transactions.length - 1 && (
                                <AddIcon size='small' onClick={() => push({ date: '', name: '' })} />
                              )}
                              {index !== 0 && <DeleteIcon size='small' onClick={() => remove(index)} />}
                            </IconButton>
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
