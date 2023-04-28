import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, Grid, MenuItem, Slide} from '@mui/material';
import {TransitionProps} from "@mui/material/transitions";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import EmployeeRepositoryImpl from "../../../infrastructure/repositories/EmployeeRepositoryImpl";
import Manager from "../../../domain/entities/Manger";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EmployeeModal(props: {
    onClose: () => void;
    open: boolean;
    dialogOperation: string;
    editData: any;
    onSave: () => void;
}) {
    const navigate = useNavigate();
    const employeeService = new EmployeeRepositoryImpl();

    const {open, onClose, dialogOperation, editData, onSave} = props;
    const addColor = "success";
    const editColor = "warning";
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email: string | undefined) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email as string)) {
            return 'Invalid email address';
        }
        return '';
    }

    const handleEmployeeOperation = (e: React.FormEvent<HTMLFormElement>) => {
        const employeeDetails:Manager = {
            id: editData?.id,
            countryId: e.currentTarget.email.value,
            email: e.currentTarget.email.value,
            userType: e.currentTarget.email.value
        }

        let request;
        let success = false;

        if (dialogOperation === 'add') {
            const emailError = validateEmail(employeeDetails.email);
            if (emailError) {
                setEmailError(emailError);
                return;
            }

            request = employeeService.getAllManagers()
        } else if (dialogOperation === 'edit') {
            request = employeeService.updateManager(employeeDetails)
        }

        if (!request) {
            return;
        }

        request.then((res: any) => {
            alert(`${res.userDao.firstname} ${dialogOperation}ed.`);
            success = true;
            onSave(); // TODO use response data rather than reload
            onClose();
        })
            .catch((error: any) => {
                console.log(error)
                alert("message");
            });
    }

    return (
        <React.Fragment>
            <Dialog open={open}
                    onClose={onClose}
                    TransitionComponent={Transition}
                    fullWidth
                    maxWidth='md'
            >
                <DialogTitle>{dialogOperation.toUpperCase()}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`${dialogOperation.charAt(0).toUpperCase()}${dialogOperation.substring(1)}`} an employee.
                    </DialogContentText>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {md: 1},
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleEmployeeOperation(e);
                        }}
                    >
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs={12} md={12}>
                                <TextField label="Email"
                                           type="email"
                                           variant="filled"
                                           name="email"
                                           fullWidth focused
                                           disabled={dialogOperation === "edit"}
                                           color={(dialogOperation === "edit") ? editColor : addColor}
                                           defaultValue={(dialogOperation === "edit") ? editData?.email : ""}
                                           error={Boolean(emailError)}
                                           helperText={emailError}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <TextField label="Country"
                                           name="country"
                                           fullWidth focused
                                           variant="filled"
                                           color={(dialogOperation === "edit") ? editColor : addColor}
                                           defaultValue={(dialogOperation === "edit") ? editData?.userDao?.lastname : ""}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <TextField
                                    label="Role"
                                    variant="filled"
                                    name='user_role'
                                    fullWidth select focused
                                    color={(dialogOperation === "edit") ? editColor : addColor}
                                    defaultValue={(dialogOperation === "edit") ? parseInt(editData?.userDao?.userRoleDao.id) : 5}
                                >
                                    <MenuItem value={2}>Administrator</MenuItem>
                                    <MenuItem value={3}>Manager</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>

                        <DialogActions>
                            <Button onClick={onClose}
                                    variant="outlined"
                                    color="error">
                                Cancel
                            </Button>

                            <Button type="submit"
                                    variant="outlined"
                                    color="success">
                                Confirm {dialogOperation.toUpperCase()}
                            </Button>

                        </DialogActions>

                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
