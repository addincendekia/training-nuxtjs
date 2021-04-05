import React from 'react'
import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function GuestLayout({ children }) {
    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Next Store
                    </Typography>
                </Toolbar>
            </AppBar>

            {children}

            <footer style={{ padding: 6 }}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://material-ui.com/">
                        Next Store
                    </Link>{' '}
                    {new Date().getFullYear() + '.'}
                </Typography>
            </footer>
        </>
    )
}

export default GuestLayout
