import React, { useEffect } from 'react'
import { useUserContext } from '../contexts/UserContext';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, Container } from '@mui/material';

const EmailVerification = () => {
    const params = useParams();
    const { VerifyEmail, isEmailVerified } = useUserContext();

    useEffect(() => {
        VerifyEmail(params.uid);
    }, [])

    return (
        <div>
            <Container maxWidth="md">
                <Card variant="outlined">
                    <CardContent>
                    {isEmailVerified && isEmailVerified?
                    <>
                        <h3>Email Verification Successfull :)</h3>
                        <p>Click <Link to={'/login'}>hear</Link> to login</p>
                    </>:<>
                        <h3>Failed to verify your email :)</h3>
                        <p>Please!, Try to <Link to={'/register'}>register</Link> again</p>
                    </>
                    }
                    </CardContent>    
                </Card>
            </Container>
        </div>
    )
}

export default EmailVerification;