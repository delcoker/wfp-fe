import {AppBar} from "./AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import {PasswordTwoTone} from "@mui/icons-material";

export function CustomAppBar(props: { open: boolean, onClick: () => void, onPasswordChangeClick: () => void }) {
    const {onClick, onPasswordChangeClick} = props;
    return <AppBar position="absolute" open={props.open}>
        <Toolbar
            sx={{
                pr: "24px", // keep right padding when drawer closed
            }}
        >
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={props.onClick}
                sx={{
                    marginRight: "36px",
                    ...(props.open && {display: "none"}),
                }}
            >
                <MenuIcon/>
            </IconButton>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{flexGrow: 1}}
            >
                Dashboard {localStorage.getItem('email')?.toUpperCase()}
            </Typography>
            <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon/>
                </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={onPasswordChangeClick}>
                <Badge badgeContent={1} color="secondary">
                    <PasswordTwoTone/>
                </Badge>
            </IconButton>
        </Toolbar>
    </AppBar>;
}