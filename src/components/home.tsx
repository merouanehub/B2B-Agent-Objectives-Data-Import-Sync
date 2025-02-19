import React, { useState } from "react";
import DatabaseConnection, { DatabaseConfig } from "./DatabaseConnection";
import * as XLSX from "xlsx";
import { connectToDatabase, syncData } from "@/lib/api";
import FileUploadZone from "./FileUploadZone";
import DataPreviewGrid from "./DataPreviewGrid";
import SyncControls from "./SyncControls";
import ResultsTable from "./ResultsTable";
import { Card } from "./ui/card";

interface HomeProps {
  onFileUpload?: (file: File) => void;
  onSync?: () => void;
}

const Home = ({ onFileUpload = () => {}, onSync = () => {} }: HomeProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [columns, setColumns] = useState<any[]>([]);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (jsonData.length > 0) {
        const excelColumns = Object.keys(jsonData[0]);
        setColumns(
          excelColumns.map((col) => ({
            excelColumn: col,
            sqlColumn: col, // Default to same name
            mapped: true,
          })),
        );
        setExcelData(jsonData);
        console.log("Excel Data:", jsonData);
        console.log("Columns:", excelColumns);
      }

      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (error) {
      console.error("Error parsing Excel file:", error);
      setIsUploading(false);
    }
  };

  const handleSync = async () => {
    if (!isDbConnected) {
      alert("Please connect to the database first");
      return;
    }

    setIsSyncing(true);
    try {
      const result = await syncData(excelData);
      setSyncProgress(100);
      // Update results table here
    } catch (error) {
      console.error("Sync error:", error);
      alert("Error during sync operation");
    } finally {
      setIsSyncing(false);
      setSyncProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <DatabaseConnection
          onConnect={async (config: DatabaseConfig) => {
            try {
              const connected = await connectToDatabase(config);
              setIsDbConnected(connected);
              if (!connected) {
                alert("Failed to connect to database");
              }
            } catch (error) {
              console.error("Database connection error:", error);
              alert("Failed to connect to database");
            }
          }}
          isConnected={isDbConnected}
        />

        <Card className="p-6 bg-white">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            B2B Agent Objectives Data Import
          </h1>
          <p className="text-gray-500">
            Upload and synchronize Excel data with the SQL Server database
          </p>
        </Card>

        <div className="grid gap-8">
          <FileUploadZone
            onFileAccepted={handleFileUpload}
            isUploading={isUploading}
            progress={uploadProgress}
          />

          <DataPreviewGrid
            data={excelData}
            columns={columns}
            onColumnMappingChange={(oldColumn, newColumn) => {
              setColumns((prev) =>
                prev.map((col) =>
                  col.excelColumn === oldColumn
                    ? { ...col, sqlColumn: newColumn, mapped: true }
                    : col,
                ),
              );
            }}
          />

          <SyncControls
            onSync={handleSync}
            isLoading={isSyncing}
            progress={syncProgress}
          />

          <ResultsTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
