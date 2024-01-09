import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CharacterByGender, People } from "./types";
import { separateByHeightKnown, separateMaleFemale } from "./utils/separateFn";
import { sortByHeight, sortByName } from "./utils/sortFn";

const FIRST_PAGE_ENDPOINT = "https://swapi.dev/api/people?page=1";
const OUTPUT_FILE_PATH = path.join(
  fileURLToPath(import.meta.url),
  "../../",
  "output.json"
);

// Get ALL the characters available from the API and categorize them based on their gender.
export const fetchAllCharacters = async (): Promise<People[]> => {
  let allCharacters: People[] = [];

  try {
    const firstResponse = await axios.get(FIRST_PAGE_ENDPOINT);
    const { count, next, results } = firstResponse.data;

    allCharacters = allCharacters.concat(results);

    const totalPages = Math.ceil(count / results.length) - 1;
    const requests = Array.from({ length: totalPages }, (_, i) =>
      axios.get(`https://swapi.dev/api/people?page=${i + 2}`)
    );

    const additionalResponses = await Promise.all(requests);

    const additionalResults = additionalResponses.reduce(
      (characters, response) => {
        const { results } = response.data;
        return characters.concat(results);
      },
      [] as People[]
    );

    allCharacters = allCharacters.concat(additionalResults);
  } catch (error: any) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }

  return allCharacters;
};

// The list of characters shall then be sorted in ascending order based on their height.
// If the height of the character is unknown, push the character to the bottom of the list.
// Characters with unknown height shall then be sorted alphabetically based on their name.
const processCharacters = async (
  characters: People[]
): Promise<CharacterByGender[]> => {
  const [maleCharacters, femaleCharacters] = await separateMaleFemale(
    characters
  );

  const [maleCharsHeightKnown, maleCharsHeightUnknown] =
    await separateByHeightKnown(maleCharacters);
  const [femaleCharsHeightKnown, femaleCharsHeightUnknown] =
    await separateByHeightKnown(femaleCharacters);

  const maleCharsHeightSorted = await sortByHeight(maleCharsHeightKnown);
  const femaleCharsHeightSorted = await sortByHeight(femaleCharsHeightKnown);

  const maleCharUnknownHeightNameSorted = await sortByName(
    maleCharsHeightUnknown
  );
  const femaleCharUnknownHeightNameSorted = await sortByName(
    femaleCharsHeightUnknown
  );

  const result = [
    {
      gender: "male",
      characters: [
        ...maleCharsHeightSorted,
        ...maleCharUnknownHeightNameSorted,
      ],
    },
    {
      gender: "female",
      characters: [
        ...femaleCharsHeightSorted,
        ...femaleCharUnknownHeightNameSorted,
      ],
    },
  ];

  return result;
};

// Output the result to a file named output.json .
const writeToFile = (data: CharacterByGender[]): void => {
  fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(data, null, 2));
};

console.time("process");
const allCharacters = await fetchAllCharacters();
const processedCharacters = await processCharacters(allCharacters);
writeToFile(processedCharacters);
console.timeEnd("process");
