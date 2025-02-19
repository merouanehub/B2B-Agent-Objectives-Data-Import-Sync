import React from "react";
import { Button } from "./ui/button";
import DatePickerWithRange from "./ui/date-picker-with-range";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card } from "./ui/card";
import { addDays } from "date-fns";
import { Progress } from "./ui/progress";
import { RefreshCw } from "lucide-react";

interface DateRange {
  from: Date;
  to: Date;
}

interface SyncControlsProps {
  onSync?: () => void;
  isLoading?: boolean;
  progress?: number;
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange) => void;
  exercice?: string;
  onExerciceChange?: (value: string) => void;
}

const SyncControls = ({
  onSync = () => {},
  isLoading = false,
  progress = 0,
  dateRange = {
    from: new Date(),
    to: addDays(new Date(), 30),
  },
  onDateRangeChange = () => {},
  exercice = "2024",
  onExerciceChange = () => {},
}: SyncControlsProps) => {
  return (
    <Card className="p-6 bg-white w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-4 items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Sync Controls</h3>
            <p className="text-sm text-gray-500">
              Configure synchronization parameters
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <DatePickerWithRange
              date={dateRange}
              onDateChange={onDateRangeChange}
            />

            <Select value={exercice} onValueChange={onExerciceChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Exercice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2022">Exercice 2022</SelectItem>
                <SelectItem value="2023">Exercice 2023</SelectItem>
                <SelectItem value="2024">Exercice 2024</SelectItem>
                <SelectItem value="2025">Exercice 2025</SelectItem>
              </SelectContent>
            </Select>

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
