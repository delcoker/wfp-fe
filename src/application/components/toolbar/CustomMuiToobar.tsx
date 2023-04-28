import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarQuickFilter
} from "@mui/x-data-grid";
import {AddIcon, DeleteIcon, EditIcon, ResetIcon} from "../svgicons/SvgIcons";
import {green, grey, red, yellow} from "@mui/material/colors";
import * as React from "react";
import {Grid} from "@mui/material";

// https://fontawesomeicons.com/svg/icons/edit-box-fill

const iconSize = 35;
const filterSize = 18;

export function CustomMuiToolbar(props:
                                     {
                                         onAddClick: () => void,
                                         onEditClick: (e: any) => void,
                                         onDeleteClick: () => void
                                         onResetClick: () => void
                                     }) {
    return <GridToolbarContainer>
        <Grid container justifyContent="center" spacing={1}>

            <Grid item xs={12} md={6} justifyContent="left">
                <GridToolbarColumnsButton sx={{fontSize: filterSize}}/>
                <GridToolbarFilterButton sx={{fontSize: filterSize}}/>
                <GridToolbarDensitySelector sx={{fontSize: filterSize}}/>
                <GridToolbarExport sx={{fontSize: filterSize, color: green[500]}}/>
            </Grid>

            <Grid item xs={12} md={2}>
            </Grid>

            <Grid item xs={12} md={2}>
                <AddIcon sx={{fontSize: iconSize, color: green[500]}} onClick={props.onAddClick}/>
                &emsp;
                <EditIcon sx={{fontSize: iconSize, color: yellow[700]}} onClick={props.onEditClick}/>
                &emsp;
                <DeleteIcon sx={{fontSize: iconSize, color: red[500]}} onClick={props.onDeleteClick}/>
                &emsp;
                <ResetIcon sx={{fontSize: iconSize, color: grey[900]}} onClick={props.onResetClick}/>
            </Grid>

            <Grid item xs={12} md={2}>
                <GridToolbarQuickFilter debounceMs={500} sx={{fontSize: iconSize}} fullWidth variant='outlined'/>
            </Grid>

        </Grid>
    </GridToolbarContainer>;
}