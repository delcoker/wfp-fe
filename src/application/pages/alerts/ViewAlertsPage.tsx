import React, {useEffect, useState} from "react";
import {GridColDef} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import {CustomMuiToolbar} from "../../components/toolbar/CustomMuiToobar";
import {StripedDataGrid} from "../../components/reusable/StripedDataGrid";
import {Paper} from "@mui/material";
import AlertDataRepositoryImpl from "../../../infrastructure/repositories/AlertDataRepositoryImpl";

const Items = () => {
    const navigate = useNavigate();
    const alertDataRepository = new AlertDataRepositoryImpl();

    const [itemEditDialogOpen, setItemEditDialogOpen] = React.useState(false);
    const [allItems, setAllItems] = useState<any>([]);
    const [pageSize, setPageSize] = React.useState(100);
    const [editData, setEditData] = React.useState(null);

    useEffect(() => {
        getData()
    }, []);

    const columns: GridColDef[] = [
        {field: "id", headerName: "Id"},
        {field: "country_id", headerName: "Country"},
        {field: "food_insecure_people", headerName: "Food Insecure People", flex: 1},
        {field: "food_insecure_people_30_days_ago", headerName: "Food Insecure People 30 Days Ago", flex: 1,},
        {field: "region_id", headerName: "Regions", flex: 1},
        {field: "percentage_difference", headerName: "% Difference", flex: 1},
        {field: "email", headerName: "Responsible Owner", flex: 1}
    ];
    const data = {rows: allItems, columns: columns};

    const rowClickHandler = (gridData: any) => {
        setEditData(gridData.row);
    };

    const getData = () => {
        alertDataRepository.getAlertData()
            .then((alertData: any) => {
                const da = alertData.map((al: any, i: any) => {
                    return {...al, id: i};
                });

                setAllItems(da)

            })
            .catch((error: any) => {
                console.log(error)
                alert(error);
            });
    };


    const CustomToolbar = () => (
        <CustomMuiToolbar
            onAddClick={() => null}
            onEditClick={() =>null}
            onDeleteClick={() => console.log("delete clicked")}
            onResetClick={() => null}
        />
    );

    return <Paper>

        <StripedDataGrid
            {...data}
            components={{Toolbar: CustomToolbar}}
            rowsPerPageOptions={[50, 100, 200]}
            pageSize={pageSize}
            onRowClick={rowClickHandler}
            onRowDoubleClick={() => setItemEditDialogOpen(true)}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            onPageSizeChange={(size) => setPageSize(size)}
            sx={{
                height: '85vh',
                boxShadow: 2,
                border: 2,
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                    color: "primary.main",
                },
            }}
            initialState={{
                columns: {
                    columnVisibilityModel: {
                        id: false
                    },
                },
            }}
            density="compact"
        />
    </Paper>
};
export default Items;
