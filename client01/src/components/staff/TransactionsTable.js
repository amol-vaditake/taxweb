import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

// eslint-disable-next-line react/prop-types
export default function TransactionTable({ transactions = [] }) {
  return (
    <TableContainer component={Paper} style={{ textAlign: 'center' }}>
      <Table sx={{ minWidth: 650 }} size='small'>
        <TableHead>
          <TableRow>
            <TableCell align='center' style={{ verticalAlign: 'top' }}>
              Name
            </TableCell>
            <TableCell align='center' style={{ verticalAlign: 'top' }}>
              Ac .No.
            </TableCell>
            <TableCell align='center' style={{ verticalAlign: 'top' }}>
              Amount
            </TableCell>
            <TableCell align='center' style={{ verticalAlign: 'top' }}>
              Commision
            </TableCell>
            <TableCell align='center' style={{ verticalAlign: 'top' }}>
              Type
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(transactions || []).map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align='center' style={{ verticalAlign: 'top' }} component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='center' style={{ verticalAlign: 'top' }}>
                {row.acNo}
              </TableCell>
              <TableCell align='center' style={{ verticalAlign: 'top' }}>
                {row.amount}
              </TableCell>
              <TableCell align='center' style={{ verticalAlign: 'top' }}>
                {row.commision}
              </TableCell>
              <TableCell align='center' style={{ verticalAlign: 'top' }}>
                {row.type}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
