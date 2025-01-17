/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useMemo } from "react";
import TimeAgo from "react-timeago";
import { useTable, useSortBy } from "react-table";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { type NetworkMembersEntity } from "~/types/network";

export const DeletedNetworkMembersTable = ({ nwid }) => {
  const { query } = useRouter();
  const { data: networkById, refetch: refetchNetworkById } =
    api.network.getNetworkById.useQuery(
      {
        nwid,
      },
      { enabled: !!query.id }
    );

  const { mutate: updateMemberDatabaseOnly } =
    api.networkMember.UpdateDatabaseOnly.useMutation({
      onSuccess: () => {
        void refetchNetworkById();
      },
    });

  const columns = useMemo(
    () => [
      {
        Header: "Authorized",
        accessor: () => <span>no</span>,
      },
      {
        Header: "Member name",
        accessor: "name",
        // width: 300,
      },
      {
        Header: "ID",
        accessor: "id",
      },

      {
        Header: "Created",
        accessor: (d: string) => <TimeAgo date={d["creationTime"]} />,
      },

      {
        Header: "Conn Status",
        accessor: () => <span>zombie</span>,
      },
      {
        Header: "Action",
        // width: 190,
        accessor: ({ id }: NetworkMembersEntity) => {
          return (
            <button
              onClick={() =>
                void updateMemberDatabaseOnly({
                  nwid,
                  id,
                  updateParams: { deleted: false },
                })
              }
              className="btn-success btn-xs rounded-sm"
            >
              re-activate
            </button>
          );
        },
      },
    ],
    []
  );

  const sortees = React.useMemo(
    () => [
      {
        id: "id",
        desc: false,
      },
    ],
    []
  );
  const data = useMemo(
    () => networkById.zombieMembers,
    [networkById.zombieMembers]
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        // defaultColumn,
        initialState: {
          sortBy: sortees,
        },
      },
      // useBlockLayout,
      // useResizeColumns,
      useSortBy
    );

  return (
    <span className="pt-2">
      <table
        className="w-full overflow-x-auto border border-gray-500"
        {...getTableProps()}
      >
        <thead className="bg-base-100">
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()} className="">
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className="py-3 pl-4">
                      {
                        // Render the header
                        column.render("Header")
                      }
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="divide-y divide-gray-200 border "
        >
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr
                  className={`items-center ${
                    !row.original.authorized
                      ? "border-dotted bg-error bg-opacity-20"
                      : ""
                  }`}
                  {...row.getRowProps()}
                >
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()} className="py-1 pl-4">
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </span>
  );
};
