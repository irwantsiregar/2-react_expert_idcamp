import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import {
  Table, TableBody, TableContainer, TableHead, TableRow,
  Paper, Avatar, Typography, Box, Container, TableCell,
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function LeaderBoards({ leaderboards }) {
  return (
    <Container maxWidth="md" className="md:border-x-2 border-solid border-slate-300 min-h-screen">
      <Box sx={{ p: { xs: 0, md: 4 } }}>
        <Typography variant="h5" className="pt-5 md:pt-2 pb-3 text-slate-600">Active User Standings </Typography>
        <Box className="border-2 border-solid border-slate-300 rounded-md mb-[5.5rem]">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
              <TableHead className="bg-slate-50">
                <TableRow>
                  <StyledTableCell>Rank.</StyledTableCell>
                  <StyledTableCell>Leading User</StyledTableCell>
                  <StyledTableCell>Score</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboards.map(({ user, score }, index) => (
                  <StyledTableRow key={user.name}>
                    <StyledTableCell sx={{ width: 0 }}>{index + 1}</StyledTableCell>
                    <StyledTableCell sx={{ display: 'flex', alignContent: 'center' }}>
                      <Avatar alt={user.name} src={user.avatar} />
                      <Typography sx={{ fontSize: '1.2rem' }} className="py-2 pl-3">{user.name}</Typography>
                    </StyledTableCell>
                    <StyledTableCell>{score}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
}

LeaderBoards.propTypes = {
  leaderboards: PropTypes.array.isRequired,
};
