import sql from "mssql";
import { DatabaseConfig } from "@/components/DatabaseConnection";

export interface SqlConfig {
  user: string;
  password: string;
  server: string;
  database: string;
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
}

let pool: sql.ConnectionPool | null = null;

export const connectToDatabase = async (
  config: DatabaseConfig,
): Promise<boolean> => {
  try {
    const sqlConfig: SqlConfig = {
      user: config.username,
      password: config.password,
      server: config.serverName,
      database: config.databaseName,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    };

    pool = await new sql.ConnectionPool(sqlConfig).connect();
    return true;
  } catch (err) {
    console.error("Database connection error:", err);
    return false;
  }
};

export const syncData = async (
  data: any[],
  tableName: string = "Objectifs_Agents_B2B",
): Promise<{
  success: boolean;
  processed: number;
  successful: number;
  failed: number;
  message: string;
}> => {
  if (!pool) {
    throw new Error("Database connection not established");
  }

  let processed = 0;
  let successful = 0;
  let failed = 0;

  try {
    for (const row of data) {
      processed++;
      try {
        await pool
          .request()
          .input("Source", sql.Float, row.Source)
          .input("CleUser", sql.Int, row.CleUser)
          .input("UserName", sql.NVarChar(100), row.UserName)
          .input("Exercice", sql.Float, row.Exercice)
          .input("DateDebut", sql.DateTime, new Date(row.DateDebut))
          .input("DateFin", sql.DateTime, new Date(row.DateFin))
          .input("Type", sql.NVarChar(50), row.Type)
          .input(
            "Montant_Objectifs",
            sql.Float,
            row.Montant_Objectifs || row.Montant,
          )
          .input("ID_Mois", sql.Int, row.ID_Mois || null).query(`
            INSERT INTO ${tableName} 
            (Source, CleUser, UserName, Exercice, DateDebut, DateFin, Type, Montant_Objectifs, ID_Mois)
            VALUES 
            (@Source, @CleUser, @UserName, @Exercice, @DateDebut, @DateFin, @Type, @Montant_Objectifs, @ID_Mois)
          `);
        successful++;
      } catch (err) {
        console.error("Error inserting row:", err);
        failed++;
      }
    }

    return {
      success: failed === 0,
      processed,
      successful,
      failed,
      message:
        failed === 0
          ? "All records synced successfully"
          : `${failed} records failed to sync`,
    };
  } catch (err) {
    console.error("Sync error:", err);
    return {
      success: false,
      processed,
      successful,
      failed: processed - successful,
      message: "Error during sync operation",
    };
  }
};
