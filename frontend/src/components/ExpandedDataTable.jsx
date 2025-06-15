import { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";

export function ExpandableDataTable({ columns, data, renderExpandedRow }) {
    const [expanded, setExpanded] = useState({});

    const table = useReactTable({
        data,
        columns,
        state: {
            expanded,
        },
        onExpandedChange: setExpanded,
        getRowCanExpand: () => true,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    return (
        <div className="rounded-md border overflow-hidden">
            <Table>
                <TableHeader className="bg-esteril-blue [&_tr:hover]:bg-esteril-blue">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="text-white">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                            <TableHead className="w-4"></TableHead>
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <>
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsExpanded() ? "expanded" : "collapsed"}
                                    className="group cursor-pointer hover:bg-muted/50"
                                    onClick={() => row.toggleExpanded()}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                    <TableCell className="w-4 p-2">
                                        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-data-[state=expanded]:text-primary">
                                            Detalles
                                            <ChevronRight
                                                className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 data-[state=expanded]:rotate-90 group-data-[state=expanded]:rotate-90"
                                            />
                                        </span>
                                    </TableCell>
                                </TableRow>
                                {row.getIsExpanded() && (
                                    <TableRow key={`exp-${row.id}`} className="bg-muted/20">
                                        <TableCell colSpan={columns.length + 1}>
                                            {renderExpandedRow(row.original)}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length + 1} className="h-12 text-center">
                                Sin Información.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}