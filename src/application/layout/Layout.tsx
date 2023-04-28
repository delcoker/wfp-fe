import React from 'react';
import {Route, Routes} from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import ViewAlertsPage from "../pages/alerts/ViewAlertsPage";
import Logout from "../pages/logout/Logout";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import {SideBar} from "../components/sidebar/SideBar";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from '@mui/material/Box';
import EmployeesPage from "../pages/employees/EmployeesPage";
import {Container} from "@mui/material";
import {CustomAppBar} from "../components/appbar/CustomAppBar";
import PasswordChangeModal from "../components/passwordchangemodal/PasswordChangeModal";


const mdTheme = createTheme();

function Layout() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [open1, setOpen1] = React.useState(false);
    const togglePasswordChangeModal = () => {
        setOpen1(!open1);
    };

    return (
        <React.Fragment>

            <ThemeProvider theme={mdTheme}>
                <Box sx={{display: 'flex'}} top={0}>
                    <CssBaseline/>
                    <CustomAppBar open={open}
                                  onClick={toggleDrawer}
                                  onPasswordChangeClick={togglePasswordChangeModal}
                    />
                    <PasswordChangeModal onClose={togglePasswordChangeModal} open={open1}/>

                    <SideBar open={open} onClick={toggleDrawer}/>

                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '99vh',
                            overflow: 'hidden',
                        }}
                    >
                        <Toolbar/>

                        <Container maxWidth={false} sx={{mt: 4, mb: 4}}>

                            <Routes>
                                <Route path="/dashboard" element={<Dashboard/>}/>
                                <Route path="/alerts" element={<ViewAlertsPage/>}/>
                                <Route path="/employees" element={<EmployeesPage/>}/>
                                <Route path="/logout" element={<Logout/>}/>
                            </Routes>

                        </Container>
                    </Box>

                </Box>
            </ThemeProvider>

        </React.Fragment>
    );
}

export default Layout;
