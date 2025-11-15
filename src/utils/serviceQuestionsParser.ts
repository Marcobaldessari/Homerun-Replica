import serviceQuestionsCSV from "../data/serviceQuestions.csv?raw";

export interface ServiceQuestion {
  controlTypeId: number; // 6 = radio, 5 = checkbox
  controlServiceId: number; // matches serviceID in homepageServices.json
  label: string; // the question text
  controlOrder: number; // order in which question should appear
  required: boolean;
  description: string;
}

let parsedQuestions: ServiceQuestion[] | null = null;

export const parseServiceQuestionsCSV = (): ServiceQuestion[] => {
  if (parsedQuestions) {
    return parsedQuestions;
  }

  const questions: ServiceQuestion[] = [];
  
  // Parse CSV accounting for quoted fields that may contain newlines
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;
  
  for (let i = 0; i < serviceQuestionsCSV.length; i++) {
    const char = serviceQuestionsCSV[i];
    const nextChar = serviceQuestionsCSV[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      // End of field
      currentRow.push(currentField.trim());
      currentField = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      // End of row (only if not in quotes)
      if (currentField || currentRow.length > 0) {
        currentRow.push(currentField.trim());
        if (currentRow.length > 0 && currentRow.some(f => f.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = "";
      }
      // Skip \r\n combinations
      if (char === "\r" && nextChar === "\n") {
        i++;
      }
    } else {
      currentField += char;
    }
  }
  
  // Handle last field/row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.length > 0 && currentRow.some(f => f.length > 0)) {
      rows.push(currentRow);
    }
  }

  // Skip header row (index 0)
  for (let i = 1; i < rows.length; i++) {
    const columns = rows[i];
    if (columns.length < 4) continue;

    const controlTypeId = parseInt(columns[0], 10);
    const controlServiceId = parseInt(columns[1], 10);
    const label = columns[2].replace(/^"|"$/g, "").trim(); // Remove surrounding quotes
    const controlOrder = parseInt(columns[3], 10);
    const required = columns[4]?.toLowerCase() === "true";
    const description = columns[5]?.replace(/^"|"$/g, "").trim() || "";

    if (!isNaN(controlTypeId) && !isNaN(controlServiceId) && !isNaN(controlOrder)) {
      questions.push({
        controlTypeId,
        controlServiceId,
        label,
        controlOrder,
        required,
        description,
      });
    }
  }

  parsedQuestions = questions;
  return questions;
};

/**
 * Get all questions for a specific service, sorted by controlOrder
 */
export const getQuestionsForService = (serviceId: number): ServiceQuestion[] => {
  const allQuestions = parseServiceQuestionsCSV();
  return allQuestions
    .filter((q) => q.controlServiceId === serviceId)
    .sort((a, b) => a.controlOrder - b.controlOrder);
};

/**
 * Get service name from serviceID by looking up in homepageServices.json
 */
export const getServiceNameFromId = async (serviceId: number): Promise<string | null> => {
  try {
    const homepageServices = await import("../data/homepageServices.json");
    for (const category of homepageServices.default) {
      const service = category.services.find((s) => s.serviceID === serviceId);
      if (service) {
        return service.serviceName;
      }
    }
  } catch (error) {
    console.error("Error loading homepageServices.json:", error);
  }
  return null;
};

