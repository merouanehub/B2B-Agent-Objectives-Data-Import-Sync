import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { RefreshCw } from "lucide-react";

interface SyncControlsProps {
  onSync?: () => void;
  isLoading?: boolean;
  progress?: number;
}

const SyncControls = ({
  onSync = () => {},
  isLoading = false,
  progress = 0,
}: SyncControlsProps) => {
  return (
    <Card className="p-6 bg-white w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-4 items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Sync Controls</h3>
            <p className="text-sm text-gray-500">
              Start synchronization with the database
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <Button
              onClick={onSync}
              disabled={isLoading}
              className="min-w-[120px]"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {isLoading ? "Syncing..." : "Start Sync"}
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Sync Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default SyncControls;
