import { useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import type { TableRow } from "../utils/metrics";

type DataTableProps = {
  rows: TableRow[];
};

function numberFormatter(value: number | null): string {
  if (value == null) {
    return "-";
  }

  return Intl.NumberFormat("en-US").format(value);
}

export function DataTable({ rows }: DataTableProps) {
  const gridRef = useRef<AgGridReact<TableRow>>(null);

  const columnDefs = useMemo<ColDef<TableRow>[]>(
    () => [
      {
        headerName: "DATE",
        field: "date",
        sort: "desc",
        minWidth: 130,
        filter: true
      },
      {
        headerName: "REALMEYE MAX",
        field: "realmeye_max",
        minWidth: 140,
        filter: "agNumberColumnFilter",
        valueFormatter: (params) => numberFormatter(params.value as number | null)
      },
      {
        headerName: "REALMEYE MIN",
        field: "realmeye_min",
        minWidth: 140,
        filter: "agNumberColumnFilter",
        valueFormatter: (params) => numberFormatter(params.value as number | null)
      },
      {
        headerName: "REALMSTOCK MAX",
        field: "realmstock_max",
        minWidth: 150,
        filter: "agNumberColumnFilter",
        valueFormatter: (params) => numberFormatter(params.value as number | null)
      },
      {
        headerName: "REALMSTOCK MIN",
        field: "realmstock_min",
        minWidth: 150,
        filter: "agNumberColumnFilter",
        valueFormatter: (params) => numberFormatter(params.value as number | null)
      },
      {
        headerName: "REALMEYE DELTA",
        field: "realmeye_delta",
        minWidth: 150,
        filter: "agNumberColumnFilter",
        cellRenderer: (params: ICellRendererParams<TableRow, number | null>) => {
          if (params.value == null) {
            return "-";
          }

          const className = params.value >= 0 ? "delta-pill positive" : "delta-pill negative";
          const label = `${params.value >= 0 ? "+" : ""}${numberFormatter(params.value)}`;

          return `<span class="${className}">${label}</span>`;
        }
      }
    ],
    []
  );

  return (
    <section className="table-section" aria-label="Daily data table">
      <div className="table-toolbar">
        <h2>Daily Data</h2>
        <button
          type="button"
          className="outline-button"
          onClick={() => gridRef.current?.api.exportDataAsCsv({ fileName: "rotmg-daily-data.csv" })}
        >
          Export CSV
        </button>
      </div>

      <div className="ag-theme-alpine rotmg-grid">
        <AgGridReact<TableRow>
          ref={gridRef}
          rowData={rows}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            suppressHeaderMenuButton: false
          }}
          animateRows={true}
          rowHeight={42}
          headerHeight={44}
        />
      </div>
    </section>
  );
}
