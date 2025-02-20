import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Column {
  excelColumn: string;
  sqlColumn: string;
  mapped: boolean;
}

interface DataPreviewGridProps {
  data?: Array<Record<string, any>>;
  columns?: Column[];
  onColumnMappingChange?: (oldColumn: string, newColumn: string) => void;
}

const DataPreviewGrid = ({
  data = [],
  columns = [],

  onColumnMappingChange = () => {},
}: DataPreviewGridProps) => {
  const sqlColumnOptions = [
    "ID",
    "Source",
    "CleUser",
    "UserName",
    "Exercice",
    "DateDebut",
    "DateFin",
    "Type",
    "Montant_Objectifs",
    "ID_Mois",
  ];

  return (
    <Card className="p-6 bg-white w-full">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Data Preview</h2>
          <Badge variant="outline" className="px-4 py-1">
            {data.length} Records
          </Badge>
        </div>

        <div className="border rounded-lg">
          <ScrollArea className="h-[400px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableHead key={index} className="min-w-[150px]">
                      <div className="space-y-2">
                        <div className="font-medium">{column.excelColumn}</div>
                        <Select
                          value={column.sqlColumn}
                          onValueChange={(value) =>
                            onColumnMappingChange(column.excelColumn, value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Map to SQL column" />
                          </SelectTrigger>
                          <SelectContent>
                            {sqlColumnOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex} className="min-w-[150px]">
                        {row[column.excelColumn]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};

export default DataPreviewGrid;
