import {Button} from "@mui/material";
import classes from './Error.module.css'
import {Link} from "react-router-dom";
import React from "react";

const Error = () => {

    return (
        <React.Fragment>
            <p>{process.env.REACT_APP_COMPANY_SHORT_NAME}</p>

            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/sales"
                size="large"
                className={classes.back__button}
            >
                Back to Home
            </Button>
        </React.Fragment>
    );
};

export default Error;
