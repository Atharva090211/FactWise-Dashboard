import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { rowData } from "./data/sampleData";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./App.css";

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const [searchText, setSearchText] = useState("");

  const totalEmployees = rowData.length;
  const activeEmployees = rowData.filter((item) => item.isActive).length;
  const averageRating =
    rowData.reduce((sum, item) => sum + (item.performanceRating || 0), 0) /
    rowData.length;

  const columnDefs = useMemo(
    () => [
      { headerName: "ID", field: "id", width: 80 },
      { headerName: "First Name", field: "firstName", flex: 1, minWidth: 140 },
      { headerName: "Last Name", field: "lastName", flex: 1, minWidth: 140 },
      { headerName: "Email", field: "email", flex: 2, minWidth: 240 },
      { headerName: "Department", field: "department", flex: 1, minWidth: 150 },
      { headerName: "Position", field: "position", flex: 2, minWidth: 200 },
      { headerName: "Location", field: "location", flex: 1, minWidth: 140 },
      { headerName: "Salary", field: "salary", width: 130 },
      { headerName: "Active", field: "isActive", width: 110 }
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true
    }),
    []
  );

  return (
    <div style={{ padding: "0" }}>
      <div
        style={{
          padding: "16px 24px 24px",
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >
        <h1>FactWise Employee Dashboard</h1>

        <div
          style={{
            display: "flex",
            gap: "12px",
            margin: "10px 0 18px",
            flexWrap: "wrap"
          }}
        >
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              background: "#ffffff",
              border: "1px solid #e4e4e7",
              minWidth: "150px"
            }}
          >
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Employees</div>
            <div style={{ fontSize: "20px", fontWeight: 600 }}>
              {totalEmployees}
            </div>
          </div>

          <div
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              background: "#ffffff",
              border: "1px solid #e4e4e7",
              minWidth: "150px"
            }}
          >
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Active</div>
            <div style={{ fontSize: "20px", fontWeight: 600 }}>
              {activeEmployees}
            </div>
          </div>

          <div
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              background: "#ffffff",
              border: "1px solid #e4e4e7",
              minWidth: "150px"
            }}
          >
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Avg rating</div>
            <div style={{ fontSize: "20px", fontWeight: 600 }}>
              {averageRating.toFixed(1)}
            </div>
          </div>
        </div>

        <div style={{ margin: "0 0 16px" }}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            style={{
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid #d4d4d8",
              width: "220px"
            }}
          />
        </div>
      </div>

      <div
        className="ag-theme-quartz"
        style={{
          height: 520,
          width: "calc(100vw - 48px)",
          margin: "0 auto"
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          quickFilterText={searchText}
        />
      </div>
    </div>
  );
}

export default App;
