import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

// eslint-disable-next-line react/prop-types
export default function TransactionTable({ taxUsers = [] }) {
  return (
    <TableContainer component={Paper} style={{ textAlign: 'center' }}>
      <Table sx={{ minWidth: 650 }} size='small'>
        <TableHead>
          <TableRow>
            <TableCell align='center' style={{ verticalAlign: 'top' }}>
              Name
            </TableCell>
            <TableCell align='center' style={{ verticalAlign: 'top' }}>
              Created At
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(taxUsers || []).map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align='center' style={{ verticalAlign: 'top' }} component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='center' style={{ verticalAlign: 'top' }}>
                {new Date(row.date).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
