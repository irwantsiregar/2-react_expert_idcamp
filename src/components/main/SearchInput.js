import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import TemporaryDrawer from './Drawer';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1.2, 1.2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '8ch',
      '&:focus': {
        width: '22ch',
      },
    },
  },
}));

export default function SearchInput({
  keyword, keywordChange, threads,
  category, categoryChange,
  timePosted, timePostedChange,
}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const drawerPosition = 'right';

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && ((event).key === 'Tab' || (event).key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <Toolbar className="w-full md:w-1/3 justify-end">
      <Search
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
        className="rounded-md shadow-lg bg-[#FEFEFE] border border-slate-100"
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      <IconButton onClick={toggleDrawer(drawerPosition, true)} sx={{ ml: 1 }}>
        <TuneIcon />
      </IconButton>
      <TemporaryDrawer
        threads={threads}
        category={category}
        categoryChange={categoryChange}
        timePosted={timePosted}
        timePostedChange={timePostedChange}
        drawer={state[drawerPosition]}
        anchor={drawerPosition}
        toggleDrawer={toggleDrawer(drawerPosition, false)}
      />
    </Toolbar>
  );
}

SearchInput.propTypes = {
  keywordChange: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  timePostedChange: PropTypes.func.isRequired,
  categoryChange: PropTypes.func.isRequired,
  timePosted: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  threads: PropTypes.array.isRequired,
};
