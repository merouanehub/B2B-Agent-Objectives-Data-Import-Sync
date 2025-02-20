import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileX, FileCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface FileUploadZoneProps {
  onFileAccepted?: (file: File) => void;
  isUploading?: boolean;
  progress?: number;
  error?: string;
}

const FileUploadZone = ({
  onFileAccepted = () => {},
  isUploading = false,
  progress = 0,
  error = "",
}: FileUploadZoneProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFile(file);
        onFileAccepted(file);
      }
    },
    [onFileAccepted],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  });

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-gray-300",
          error ? "border-destructive" : "",
        )}
        onDragEnter={() => setIsDragActive(true)}
        onDragLeave={() => setIsDragActive(false)}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center gap-4">
          {isUploading ? (
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          ) : file ? (
            <FileCheck className="h-12 w-12 text-primary" />
          ) : error ? (
            <FileX className="h-12 w-12 text-destructive" />
          ) : (
            <Upload className="h-12 w-12 text-gray-400" />
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              {file ? file.name : "Drop your Excel file here"}
            </h3>
            <p className="text-sm text-gray-500">
              {error ? (
                <span className="text-destructive">{error}</span>
              ) : file ? (
                "File ready for processing"
              ) : (
                "Drag and drop your .xlsx or .xls file, or click to browse"
              )}
            </p>
          </div>

          {!file && !isUploading && (
            <Button variant="outline" className="mt-4">
              Select File
            </Button>
          )}
        </div>
      </div>

      {isUploading && (
        <div className="mt-4 space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-center text-gray-500">
            Uploading... {progress}%
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;
