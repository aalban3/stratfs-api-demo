import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";

import axios from "axios";
import Table from "./Table";

export default function Main() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const { data: apiRows } = await axios.get(
        "https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json"
      );
      setRows(apiRows);
    } catch (err) {
      setError(err);
      throw new Error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    // Error message
    return (
      <div className="error">
        <strong>Something went wrong, couldn&apos;t fetch data.</strong>
      </div>
    );
  }

  if (!rows) {
    // Loading indicator
    return (
      <div className="loader">
        <CircularProgress size={200} thickness={5} />
      </div>
    );
  }

  // table renders only if there is data to show
  return <Table rows={rows} setRows={setRows} />;
}
