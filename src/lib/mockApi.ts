import { DatabaseConfig } from "@/components/DatabaseConnection";

export const connectToDatabase = async (
  config: DatabaseConfig,
): Promise<boolean> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Basic validation
  if (
    !config.serverName ||
    !config.databaseName ||
    !config.username ||
    !config.password
  ) {
    return false;
  }

  // Simulate successful connection
  return true;
};

const validateRow = (row: any) => {
  // All fields are nullable except ID (which is auto-generated)
  // Just validate data types if values are present

  if (row.Source && isNaN(Number(row.Source))) {
    return {
      valid: false,
      message: "Source must be a number",
    };
  }

  if (row.CleUser && isNaN(Number(row.CleUser))) {
    return {
      valid: false,
      message: "CleUser must be a number",
    };
  }

  if (row.UserName && typeof row.UserName !== "string") {
    return {
      valid: false,
      message: "UserName must be a string",
    };
  }

  if (row.Exercice && isNaN(Number(row.Exercice))) {
    return {
      valid: false,
      message: "Exercice must be a number",
    };
  }

  // Validate dates if present
  if (row.DateDebut && new Date(row.DateDebut).toString() === "Invalid Date") {
    return {
      valid: false,
      message: "DateDebut must be a valid date",
    };
  }

  if (row.DateFin && new Date(row.DateFin).toString() === "Invalid Date") {
    return {
      valid: false,
      message: "DateFin must be a valid date",
    };
  }

  if (row.Type && typeof row.Type !== "string") {
    return {
      valid: false,
      message: "Type must be a string",
    };
  }

  const montantValue = row.Montant_Objectifs || row.Montant;
  if (montantValue && isNaN(Number(montantValue))) {
    return {
      valid: false,
      message: "Montant_Objectifs must be a number",
    };
  }

  if (row.ID_Mois && isNaN(Number(row.ID_Mois))) {
    return {
      valid: false,
      message: "ID_Mois must be a number",
    };
  }

  return { valid: true, message: "" };
};

export const syncData = async (
  data: any[],
): Promise<{
  success: boolean;
  processed: number;
  successful: number;
  failed: number;
  message: string;
  errors?: string[];
}> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const processed = data.length;
  let successful = 0;
  let failed = 0;
  const errors: string[] = [];

  // Process each row
  for (const row of data) {
    const validation = validateRow(row);
    if (validation.valid) {
      successful++;
    } else {
      failed++;
      errors.push(`Row validation failed: ${validation.message}`);
    }
  }

  return {
    success: failed === 0,
    processed,
    successful,
    failed,
    errors,
    message:
      failed === 0
        ? "All records synced successfully"
        : `${failed} records failed validation`,
  };
};
