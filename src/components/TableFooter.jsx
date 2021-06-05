import React from "react";
import Button from "@material-ui/core/Button";

export default function TableFooter({
  selected,
  rows,
  handleAdding,
  handleDelete,
}) {
  const totalFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // calculate Balances total
  const totalBalance = () => {
    const sumTotal = rows.reduce((acc, row) => {
      if (selected.includes(row.id)) {
        acc += +row.balance || 0;
      }
      return acc;
    }, 0);
    return sumTotal;
  };

  return (
    <footer className="footer-container">
      <div className="footer-buttons">
        <Button variant="contained" color="primary" onClick={handleAdding}>
          Add Debt
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Remove Debt
        </Button>
      </div>
      <div className="total">
        <strong>Total</strong>
        <strong>{totalFormatter.format(totalBalance())}</strong>
      </div>
      <div className="row-count">
        <strong>Total Rows: {rows.length}</strong>
        <strong>Rows Selected: {selected.length}</strong>
      </div>
    </footer>
  );
}
