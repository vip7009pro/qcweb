import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main'
import './components/bootstrap.min.css'
import { checkLogin } from './Api/Api';
import LoginPage from './components/LoginPage/LoginPage';
import { UserContext, SocketContext } from './Api/Context';
import './components/dataTables.bootstrap4.min.css'
import socketIOClient from 'socket.io-client'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

function QC() {
    const [loginState, setloginState] = useState(0);
    const [userdata, setUserData] = useState("okma");
    const socketReft = useRef();
    useEffect(() => {
        checkLogin().then(data => {
            console.log(data);
            if (data.data.tk_status == 'ng') {
                setloginState(0);
                setUserData(data.data.data);
            }
            else {
                setloginState(1);
                console.log(data.data.data);
                socketReft.current = socketIOClient.connect('14.160.33.94:3005');
                setUserData(data.data.data);
            }
        })
            .catch(err => {
                console.log(err + ' ');
            })
        return () => {
            socketReft.current.disconnect();
        }
    }, []);
    console.log("Login State = " + loginState);
    if (loginState == 1) {
        return (
            <>
                <div>
                    <UserContext.Provider value={[userdata, setUserData]}>
                        <SocketContext.Provider value={socketReft}>                            
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={8}>
                                    <Button variant='contained'>Hello World</Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                    <Button variant='contained'>Hello World</Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                    <Button variant='contained'>Hello World</Button>
                                    </Grid>
                                    <Grid item xs={8}>
                                    <Button variant='contained'>Hello World</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </SocketContext.Provider>
                    </UserContext.Provider>
                </div>
            </>
        );
    }
    return (
        <LoginPage />
    )
}
export default QC;
