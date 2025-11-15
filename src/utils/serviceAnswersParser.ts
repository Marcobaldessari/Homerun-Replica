import serviceAnswersCSV from "../data/serviceAnswers.csv?raw";

export interface ServiceAnswer {
  id: number;
  controlId: number; // Maps to a specific question/control
  controlServiceId: number; // matches serviceID
  value: string; // The answer option text
  valueOrder: number; // Order in which answer should appear
}

let parsedAnswers: ServiceAnswer[] | null = null;

export const parseServiceAnswersCSV = (): ServiceAnswer[] => {
  if (parsedAnswers) {
    return parsedAnswers;
  }

  const answers: ServiceAnswer[] = [];
  
  // Parse CSV accounting for quoted fields
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;
  
  for (let i = 0; i < serviceAnswersCSV.length; i++) {
    const char = serviceAnswersCSV[i];
    const nextChar = serviceAnswersCSV[i + 1];
    
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
    if (columns.length < 5) continue;

    const id = parseInt(columns[0], 10);
    const controlId = parseInt(columns[1], 10);
    const controlServiceId = parseInt(columns[2], 10);
    const value = columns[3].replace(/^"|"$/g, "").trim(); // Remove surrounding quotes
    const valueOrder = parseInt(columns[4], 10);

    if (!isNaN(id) && !isNaN(controlId) && !isNaN(controlServiceId) && !isNaN(valueOrder)) {
      answers.push({
        id,
        controlId,
        controlServiceId,
        value,
        valueOrder,
      });
    }
  }

  parsedAnswers = answers;
  return answers;
};

/**
 * Get answers for a specific service, grouped by controlId
 * Returns a map: controlId -> answers sorted by valueOrder
 */
export const getAnswersForService = (
  serviceId: number
): Map<number, ServiceAnswer[]> => {
  const allAnswers = parseServiceAnswersCSV();
  const serviceAnswers = allAnswers.filter(
    (a) => a.controlServiceId === serviceId
  );

  // Group by controlId
  const grouped = new Map<number, ServiceAnswer[]>();
  for (const answer of serviceAnswers) {
    if (!grouped.has(answer.controlId)) {
      grouped.set(answer.controlId, []);
    }
    grouped.get(answer.controlId)!.push(answer);
  }

  // Sort each group by valueOrder
  for (const [controlId, answers] of grouped.entries()) {
    answers.sort((a, b) => a.valueOrder - b.valueOrder);
  }

  return grouped;
};

/**
 * Get answer options for a question
 * Since we don't have a direct mapping between questions and controlId,
 * we'll match by service ID and question order.
 * 
 * The matching works by:
 * 1. Getting all answer groups (by CONTROLID) for the service
 * 2. Sorting CONTROLIDs to get a consistent order
 * 3. Matching question order (0, 1, 2...) to the sorted CONTROLID index
 * 
 * @param serviceId - The service ID
 * @param questionOrder - The controlOrder of the question (0, 1, 2, etc.)
 * @returns Array of answer values sorted by valueOrder
 */
export const getAnswerOptionsForQuestion = (
  serviceId: number,
  questionOrder: number
): string[] => {
  const groupedAnswers = getAnswersForService(serviceId);
  
  if (groupedAnswers.size === 0) {
    return [];
  }
  
  // Get all controlIds for this service and sort them
  // This gives us a consistent ordering to match with question order
  const controlIds = Array.from(groupedAnswers.keys()).sort((a, b) => a - b);
  
  // Match by order: questionOrder (0, 1, 2...) corresponds to the index in sorted controlIds
  // e.g., question with controlOrder 0 -> first CONTROLID group, controlOrder 1 -> second, etc.
  if (questionOrder >= 0 && questionOrder < controlIds.length) {
    const controlId = controlIds[questionOrder];
    const answers = groupedAnswers.get(controlId) || [];
    // Answers are already sorted by valueOrder in getAnswersForService
    return answers.map((a) => a.value);
  }
  
  return [];
};

