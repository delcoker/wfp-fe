import * as React from 'react';
import {useEffect, useState} from 'react';
import EmployeeModal from "../employeemodal/EmployeeModal";
import {CustomMuiToolbar} from "../toolbar/CustomMuiToobar";
import {StripedDataGrid} from "../reusable/StripedDataGrid";
import {useNavigate} from "react-router-dom";
import EmployeeRepositoryImpl from "../../../infrastructure/repositories/EmployeeRepositoryImpl";

const VISIBLE_FIELDS = ['countryId', 'id', 'email', 'userType'];

let columns = [
    {
        field: "id",
        hide: true,
        disableExport: true
    },
    {
        "field": "countryId",
        "headerName": "Country",
        "hide": false,
        "disableExport": true,
    },
    {
        "field": "email",
        "headerName": "Email",
        flex: 1
    },
    {
        "field": "userType",
        "headerName": "User Type",
        flex: 1,
    }
];


export default function EmployeeDataTable() {
    const navigate = useNavigate();
    const employeeService = new EmployeeRepositoryImpl();

    const [pageSize, setPageSize] = React.useState(15);
    const [employeeDialogOpen, setEmployeeDialogOpen] = React.useState(false);
    const [dialogOperation, setDialogOperation] = React.useState('edit');
    const [editData, setEditData] = React.useState(null);

    const [data, setData] = useState<{ columns: any; rows: any; }>({
        columns: columns,
        rows: []
    });

    columns = React.useMemo(() => data.columns
            .filter((column: { field: string; }) => VISIBLE_FIELDS.includes(column.field)),
        [data.columns],
    );

    useEffect(() => {
        getManagers();
    }, [])

    const getManagers = () => {

        const dataIn = {
            columns: columns,
            rows: employeeService.getAllManagers(),
        };
        setData(dataIn);

    }

    const addEmployeeHandler = () => {
        setDialogOperation("add");
        setEmployeeDialogOpen(true);
    }

    const editEmployeeHandler = () => {
        if (!editData) {
            alert("Who would you want to edit?")
            return;
        }
        setDialogOperation("edit");
        setEmployeeDialogOpen(true);
    }

    const rowClickHandler = (gridData: any) => {
        setEditData(gridData.row);
    }

    const CustomToolbar = () =>
        <CustomMuiToolbar onAddClick={addEmployeeHandler}
                          onEditClick={editEmployeeHandler}
                          onDeleteClick={() => {
                              console.log("delete clicked");
                          }}
                          onResetClick={() => {
                          }}
        />

    return (
        <React.Fragment>
            <EmployeeModal open={employeeDialogOpen}
                           onClose={() => setEmployeeDialogOpen(false)}
                           dialogOperation={dialogOperation}
                           editData={editData}
                           onSave={getManagers}
            />

            <StripedDataGrid
                {...data}
                disableColumnMenu
                components={{Toolbar: CustomToolbar}}
                rowsPerPageOptions={[15, 30, 100]}
                pageSize={pageSize}
                onRowClick={rowClickHandler}
                onRowDoubleClick={() => setEmployeeDialogOpen(true)}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
                onPageSizeChange={(size) => setPageSize(size)}
                sx={{
                    height: '85vh',
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'primary.dark',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'warning.main',
                    },
                }}
                initialState={{
                    sorting: {
                        sortModel: [{field: 'firstname', sort: 'asc'}],
                    },
                }}
            />
        </React.Fragment>
    );
}