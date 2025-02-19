import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface SyncResult {
  id: string;
  filename: string;
  timestamp: string;
  status: "success" | "error";
  recordsProcessed: number;
  recordsSuccessful: number;
  recordsFailed: number;
  message?: string;
}

interface ResultsTableProps {
  results: SyncResult[];
}

const defaultResults: SyncResult[] = [
  {
    id: "1",
    filename: "agents-data-2024.xlsx",
    timestamp: "2024-03-20 14:30:00",
    status: "success",
    recordsProcessed: 150,
    recordsSuccessful: 148,
    recordsFailed: 2,
    message: "Import completed successfully",
  },
  {
    id: "2",
    filename: "q1-objectives.xlsx",
    timestamp: "2024-03-20 14:15:00",
    status: "error",
    recordsProcessed: 75,
    recordsSuccessful: 70,
    recordsFailed: 5,
    message: "Some records failed validation",
  },
];

const ResultsTable = ({ results = defaultResults }: ResultsTableProps) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Sync Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Processed</TableHead>
              <TableHead>Successful</TableHead>
              <TableHead>Failed</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {result.status === "success" ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800"
                        >
                          Success
                        </Badge>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500" />
                        <Badge
                          variant="destructive"
                          className="bg-red-100 text-red-800"
                        >
                          Error
                        </Badge>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>{result.filename}</TableCell>
                <TableCell>{result.timestamp}</TableCell>
                <TableCell>{result.recordsProcessed}</TableCell>
                <TableCell className="text-green-600">
                  {result.recordsSuccessful}
                </TableCell>
                <TableCell className="text-red-600">
                  {result.recordsFailed}
                </TableCell>
                <TableCell>{result.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ResultsTable;
