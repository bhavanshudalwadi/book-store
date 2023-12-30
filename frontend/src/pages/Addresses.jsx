import { Button, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import React from 'react'

const Addresses = () => {

    return (
        <div>
            <Container maxWidth="md">
                <Card variant="outlined">
                    <CardContent>
                        {/* <Typography
                            variant="h5"
                            component="div"
                            sx={{ mb: 2, textAlign: "center" }}
                        >
                            Addresses
                        </Typography> */}
                        <div style={{margin: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Typography variant='h5'>Addresses</Typography>
                            <Button variant='contained'>Add New</Button>
                        </div>
                        <Grid
                            container
                            columns={{ xs: 11, sm: 11, md: 11 }}
                            sx={{ mb: 0, display: 'flex', justifyContent: 'space-between' }}
                        >
                            <Grid item xs={11} sm={5.3} md={5.3}>
                                <Card variant='outlined' style={{borderWidth: 2}}>
                                    <CardContent>
                                        <Typography variant='body1'>Plot No. 528, A, Street No. 9, Vijayrajnagar, Bhavnagar - 364001, Near R.T.O. Road</Typography>
                                        <Typography variant='subtitle2' sx={{mt: 1}} color="text.secondary">Default Address</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}

export default Addresses;