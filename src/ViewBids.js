import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionDown(props) {
    return <Slide {...props} direction="up" />;
}

const ViewBids = ({ prodData, bidding, errorMessage, snackBar, loading, setSnackBar,
    message, severity, sort, changeSort, count, page, changePage }) => {

    return (
        <>
            <Grid item sm={12} xs={12} md={12} container justifyContent="flex-start" alignItems="flex-start">
                {prodData && bidding.length > 0 &&
                    <Grid container justifyContent="center" alignItems="flex-start" spacing={2} sx={{ p: 3 }}>
                        <Grid item sm={12} xs={12} md={5}>
                            <Grid item container direction="row" spacing={2}>
                                <Grid item sm={12} xs={12} md={3} sx={{ margin: 'auto' }}>
                                    <Typography variant="subtitle2" align="left">
                                        Short Description:
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} xs={12} md={9}>
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        value={prodData?.shortDescription}
                                        disabled
                                        margin="dense"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container direction="row" spacing={2}>
                                <Grid item sm={12} xs={12} md={3} sx={{ margin: 'auto' }}>
                                    <Typography variant="subtitle2" align="left">
                                        Long Description:
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} xs={12} md={9}>
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        value={prodData?.longDescription}
                                        disabled
                                        margin="dense"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={12} xs={12} md={5}>
                            <Grid item container direction="row" spacing={2}>
                                <Grid item sm={12} xs={12} md={3} sx={{ margin: 'auto' }}>
                                    <Typography variant="subtitle2" align="left">
                                        Category:
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} xs={12} md={9}>
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        value={prodData?.category}
                                        disabled
                                        margin="dense"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container direction="row" spacing={2}>
                                <Grid item sm={12} xs={12} md={3} sx={{ margin: 'auto' }}>
                                    <Typography variant="subtitle2" align="left">
                                        Price:
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} xs={12} md={9}>
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        value={prodData?.price}
                                        disabled
                                        margin="dense"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container direction="row" spacing={2}>
                                <Grid item sm={12} xs={12} md={3} sx={{ margin: 'auto' }}>
                                    <Typography variant="subtitle2" align="left">
                                        Bid End Date:
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} xs={12} md={9}>
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        value={prodData?.bidEndDate}
                                        disabled
                                        margin="dense"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={12} xs={12} md={10}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Email</StyledTableCell>
                                            <StyledTableCell >Name</StyledTableCell>
                                            <StyledTableCell >Phone</StyledTableCell>
                                            <StyledTableCell >{
                                                <Grid container justifyContent="center" alignItems="center">
                                                    <Typography>Bid</Typography>
                                                    <IconButton onClick={(e) => changeSort()}>
                                                        {sort === "ASE" ?
                                                            <ArrowUpwardIcon style={{ color: "white" }} /> :
                                                            <ArrowDownwardIcon style={{ color: "white" }} />
                                                        }
                                                    </IconButton>
                                                </Grid>
                                            }</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bidding.map((row) => (
                                            <StyledTableRow key={row.email}>
                                                <StyledTableCell component="th" scope="row">
                                                    {row.email}
                                                </StyledTableCell>
                                                <StyledTableCell >{row.firstName}</StyledTableCell>
                                                <StyledTableCell >{row.phoneNumber}</StyledTableCell>
                                                <StyledTableCell >{row.bidAmount}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Pagination count={count} variant="outlined" shape="rounded"
                                    page={page} onChange={changePage} />
                            </TableContainer>
                        </Grid>
                    </Grid>
                }
                {errorMessage != null &&
                    <MuiAlert severity="info" sx={{ width: '100%' }}>{errorMessage}</MuiAlert>
                }
            </Grid>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackBar}
                autoHideDuration={6000}
                TransitionComponent={TransitionDown}
                onClose={() => setSnackBar(false)}>
                <Alert onClose={() => setSnackBar(false)} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            {loading &&
                <Backdrop
                    sx={{ color: '##008080', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
        </>
    )
}
export default ViewBids;