import * as React from 'react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import {
  Table, TableBody, TableContainer, TableHead, TableRow,
  Paper, Avatar, Typography, Box, Container, TableCell,
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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

const users = [
  { name: 'Shawshank', skor: 720 },
  { name: 'Godfather', skor: 672 },
  { name: 'Godmother', skor: 604 },
  { name: 'Dark Knight', skor: 580 },
  { name: 'Angry Men', skor: 450 },
  { name: "Schindler's", skor: 490 },
  { name: 'Pulp Fiction', skor: 429 },
  { name: 'Arrow Dark', skor: 402 },
];

export default function Standings() {
  return (
    <Container maxWidth="md" className="md:border-x-2 border-solid border-slate-300 min-h-screen">
      <Box sx={{ p: { xs: 0, md: 4 } }}>
        <Typography component="h6" variant="h6" className="pt-3 pb-3 text-slate-600">Active User Standings </Typography>
        <Box className="border-2 border-solid border-slate-300 rounded-md mb-[5.5rem]">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Rank.</StyledTableCell>
                  <StyledTableCell>Leading User</StyledTableCell>
                  <StyledTableCell>Skor</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <StyledTableRow key={user.name}>
                    <StyledTableCell sx={{ width: 0 }}>{index + 1}</StyledTableCell>
                    <StyledTableCell sx={{ display: 'flex', alignContent: 'center' }}>
                      <Avatar alt={user.name} src="/images/avatar.png" />
                      <Typography sx={{ fontSize: '1.2rem' }} className="py-2 pl-3">{user.name}</Typography>
                    </StyledTableCell>
                    <StyledTableCell>{user.skor}</StyledTableCell>

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

/*
<List dense sx={{ px: { xs: 0, md: 10 }, pb: { xs: 0, md: 4 } }}>
            <ListItem className="flex justify-evenly bg-slate-100 w-1/2 rounded-sm -mt-2">
              <Typography className="flex justify-center w-full font-bold">Leading User</Typography>
              <Typography className="flex justify-end w-full font-bold"> Skor </Typography>
            </ListItem>
                     {users.map((user) => (
              <>
                <ListItem key={user.name} className="my-1" secondaryAction={(
                  <Typography component="span" variant="body1" color="text.primary">{user.skor}</Typography>
                )}
                >
                  <ListItemAvatar>
                    <Avatar alt={`Avatar n°${user.name}`} src="/images/girl.png" />
                  </ListItemAvatar>
                  <ListItemText id={user.name} primary={user.name} />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
*/
