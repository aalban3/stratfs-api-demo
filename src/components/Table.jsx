/* eslint-disable react/display-name */
import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import TableFooter from "./TableFooter";

const amountFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const minPayFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const columns = [
  {
    field: "creditorName",
    headerName: "Creditor Name",
    width: 180,
    editable: true,
  },
  { field: "firstName", headerName: "First Name", width: 150, editable: true },
  { field: "lastName", headerName: "Last Name", width: 150, editable: true },
  {
    field: "minPaymentPercentage",
    headerName: "Min Pay %",
    width: 150,
    editable: true,
    valueFormatter: (params) =>
      `${minPayFormatter.format(params.value / 100 || 0)}`,
  },
  {
    field: "balance",
    headerName: "Balance (USD)",
    width: 180,
    editable: true,
    valueFormatter: (params) => `${amountFormatter.format(params.value || 0)}`,
  },
];

export default function Table({ rows, setRows }) {
  const [selectionModel, setSelectionModel] = useState([]);

  const handleEditCellChange = (change) => {
    const { id, field, props } = change;
    // To update rows in state:
    // * make a copy of the array
    // * edit the object within the array
    // * set the row state

    let updatedRows = [...rows];
    let changedRow = updatedRows.filter((row) => row.id == id)[0];
    changedRow[field] = props.value;
    setRows(updatedRows);
  };
  const handleAdding = () => {
    const newRowId = Math.floor(Math.random() * 10000);
    setRows((currentRows) => [...currentRows, { id: newRowId }]);
  };

  const handleDelete = () => {
    setRows((currentRows) =>
      currentRows.filter((row) => !selectionModel.includes(row.id))
    );
    setSelectionModel([]);
  };
  return (
    <div className="table">
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={true}
        checkboxSelection
        hideFooterPagination
        onSelectionModelChange={(newSelection) => {
          setSelectionModel(newSelection.selectionModel);
        }}
        selectionModel={selectionModel}
        onEditCellChange={handleEditCellChange}
        components={{
          Footer: () => (
            <TableFooter
              selected={selectionModel}
              rows={rows}
              handleAdding={handleAdding}
              handleDelete={handleDelete}
            />
          ),
        }}
      />
    </div>
  );
}
