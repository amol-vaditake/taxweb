/* eslint-disable react/prop-types */
import React from 'react'
import { Grid, Paper } from '@mui/material'
import Loader from '../Loader'

export default function Table({ salesTransactions = [], userPage }) {
  return (
    <Paper elevation={4}>
      {salesTransactions?.length ? (
        <>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            style={{
              textAlign: 'center',
              fontWeight: 700,
              height: '5rem',
              borderBottom: '2px solid rgb(255, 137, 130)',
              borderTop: '2px solid rgb(255, 137, 130)',
              fontSize: '18px'
            }}
          >
            <Grid item xs={1.5} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '5.8rem' }}>
              Date
            </Grid>
            {!userPage ? (
              <Grid item xs={2.5} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '5.8rem' }}>
                Name
              </Grid>
            ) : (
              <Grid item xs={2.5} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '5.8rem' }}>
                Reference
              </Grid>
            )}
            <Grid item xs={4} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '5.8rem' }}>
              Description
            </Grid>
            <Grid item xs={4} container alignItems='baseline'>
              <Grid item xs={12} style={{ borderBottom: '2px solid rgb(255, 137, 130)', lineHeight: '2' }}>
                Final Value
              </Grid>
              <Grid item xs={6} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '2.5' }}>
                Credit
              </Grid>
              <Grid item xs={6}>
                Debit
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent='center' alignItems='center' style={{ textAlign: 'center' }}>
            {(salesTransactions || []).map((t, i) => {
              return (
                <>
                  <Grid
                    item
                    xs={1.5}
                    style={{
                      ...(i !== salesTransactions.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {}),
                      borderRight: '2px solid rgb(255, 137, 130)',
                      lineHeight: '4rem'
                    }}
                    title={new Date(t.Date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  >
                    {console.log(t)}
                    {t.date ? new Date(t.date).toDateString() : new Date(t.Date).toDateString()}
                  </Grid>
                  <Grid
                    item
                    xs={2.5}
                    style={{
                      borderRight: '2px solid rgb(255, 137, 130)',
                      ...(i !== salesTransactions.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {}),
                      lineHeight: '4rem'
                    }}
                  >
                    {!userPage ? t.name : t.reference || 'NA'}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{
                      borderRight: '2px solid rgb(255, 137, 130)',
                      ...(i !== salesTransactions.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {}),
                      lineHeight: '4rem'
                    }}
                  >
                    {!t.description ? (
                      <>
                        {t.quantity} {t.sign} {t.price}
                      </>
                    ) : (
                      <>{t.description}</>
                    )}
                  </Grid>
                  <Grid item xs={4} container>
                    <Grid
                      item
                      xs={6}
                      style={{
                        borderRight: '2px solid rgb(255, 137, 130)',
                        ...(i !== salesTransactions.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {}),
                        lineHeight: '4rem'
                      }}
                    >
                      {!t.description ? (
                        <>{t.type === 'credit' ? t.finalValue : '---'}</>
                      ) : (
                        <>{t.finalType === 'credit' ? t.finalAmount : '---'}</>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        ...(i !== salesTransactions.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {}),
                        lineHeight: '4rem'
                      }}
                    >
                      {!t.description ? (
                        <>{t.type === 'debit' ? t.finalValue : '---'}</>
                      ) : (
                        <>{t.finalType === 'debit' ? t.finalAmount : '---'}</>
                      )}
                    </Grid>
                  </Grid>
                </>
              )
            })}
          </Grid>
        </>
      ) : (
        <>
          <h2 style={{ textAlign: 'center' }}>No Trasactions Found</h2>
          <Loader />
        </>
      )}
    </Paper>
  )
}
