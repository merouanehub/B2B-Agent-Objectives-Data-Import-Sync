import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Database, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "./ui/badge";

interface DatabaseConnectionProps {
  onConnect?: (config: DatabaseConfig) => void;
  isConnected?: boolean;
}

export interface DatabaseConfig {
  serverName: string;
  databaseName: string;
  tableName: string;
  username: string;
  password: string;
}

const DatabaseConnection = ({
  onConnect = () => {},
  isConnected = false,
}: DatabaseConnectionProps) => {
  const [config, setConfig] = useState<DatabaseConfig>({
    serverName: "",
    databaseName: "",
    tableName: "Objectifs_Agents_B2B",
    username: "",
    password: "",
  });

  const handleConnect = () => {
    onConnect(config);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">
          Database Connection
        </CardTitle>
        {isConnected ? (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Connected
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            <XCircle className="w-4 h-4 mr-1" />
            Not Connected
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="serverName">Server Name</Label>
            <Input
              id="serverName"
              placeholder="e.g., localhost\\SQLEXPRESS"
              value={config.serverName}
              onChange={(e) =>
                setConfig({ ...config, serverName: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="databaseName">Database Name</Label>
            <Input
              id="databaseName"
              placeholder="Enter database name"
              value={config.databaseName}
              onChange={(e) =>
                setConfig({ ...config, databaseName: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="SQL Server username"
              value={config.username}
              onChange={(e) =>
                setConfig({ ...config, username: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="SQL Server password"
              value={config.password}
              onChange={(e) =>
                setConfig({ ...config, password: e.target.value })
              }
            />
          </div>
        </div>
        <Button
          className="w-full"
          onClick={handleConnect}
          disabled={isConnected}
        >
          <Database className="w-4 h-4 mr-2" />
          {isConnected ? "Connected" : "Connect to Database"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DatabaseConnection;
