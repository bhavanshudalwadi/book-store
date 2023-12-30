import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import { Container, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCategoryContext } from '../contexts/CategoryContext';
import { useGlobalContext } from '../contexts/GlobalContext';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Category Name',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: '',
  }
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}
  
function getComparator(order, orderBy) {
return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
} 

const CategoryList = () => {

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [page, setPageNo] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchParam, setSearchParam] = React.useState('');

  const navigate = useNavigate();

  const { categories, getCategories, removeCategory } = useCategoryContext();
  const { dialog, setDialog } = useGlobalContext();

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.label !== '' ?
                  <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                      sx={{fontWeight: 'bold'}}
                  >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </Box>
                      ) : null}
                  </TableSortLabel>
                  :<></>
              }
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPageNo(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    setPageNo(0);
    getCategories('');
  },[])

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

  const handleSearch = (e) => {
    setSearchParam(e.target.value);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageNo(0);
      getCategories(searchParam)
    }, 500);
    return () => clearTimeout(timer);
  },[searchParam])

  useEffect(() => {
    if(dialog.delete){
      removeCategory()
    }
  }, [dialog]);

  return (
    <div>
      <div style={{textAlign: 'center'}}>
        <Typography variant='h5'>Categories</Typography>
      </div>
      <Container sx={{mt: 3}} maxWidth="lg">
        <TextField variant='outlined' sx={{width: 200, mr: 2}} onChange={handleSearch} placeholder='Search Category' size='small'/>         
        <Button sx={{width: 120}} onClick={() => navigate('/add-category')} variant="contained">Add New</Button>
        <div>
          <Box sx={{ width: '100%', mt: 2 }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                >
                  <EnhancedTableHead
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={categories.length}
                  />
                    <TableBody>
                      {categories && stableSort(categories, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => {
                          return (
                              <TableRow
                                  hover
                                  tabIndex={-1}
                                  key={row.id}
                              >
                                  <TableCell>{row.name}</TableCell>
                                  <TableCell align='right' sx={{width: 160}}>
                                    <Button variant="outlined" color='success' onClick={() => navigate(`/edit-category/${row.id}`)} size='small'>Edit</Button>
                                    <Button
                                      variant="outlined"
                                      color='error'
                                      size='small'
                                      sx={{ml: 2}}
                                      onClick={() => 
                                        setDialog({
                                          open: true,
                                          title: "Are you sure ?",
                                          description: `You want to delete category named '${row.name}' ?`,
                                          id: row.id,
                                          delete: false
                                        })
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </TableCell>
                              </TableRow>
                          );
                      })}
                      {emptyRows > 0 && (
                          <TableRow
                            style={{
                                height: 63 * emptyRows,
                            }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                      )}
                    </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={categories.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>      
          </Box>
        </div>
      </Container>
    </div>
  )
}

export default CategoryList;