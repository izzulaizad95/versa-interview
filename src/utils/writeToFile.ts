import * as fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { CharacterByGender } from "../../src/types";

export const writeToFile = async (
  fileName: string,
  data: CharacterByGender[]
): Promise<string> => {
  const OUTPUT_FILE_PATH = path.join(
    fileURLToPath(import.meta.url),
    "../../../",
    fileName
  );

  try {
    await fs.writeFile(OUTPUT_FILE_PATH, JSON.stringify(data, null, 2));
    return "File written successfully!";
  } catch (error: unknown | any) {
    console.error(`Error writing file: ${error.message}`);
    throw error;
  }
};
