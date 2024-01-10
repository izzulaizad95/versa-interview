import axios from "axios";

import { CharacterByGender, People } from "./types";
import { separateByGender, separateByHeightKnown } from "./utils/separateFn";
import { sortByHeight, sortByName } from "./utils/sortFn";
import { writeToFile } from "./utils/writeToFile";

const FIRST_PAGE_ENDPOINT = "https://swapi.dev/api/people?page=1";

// Get ALL the characters available from the API and categorize them based on their gender.
export const fetchAllCharacters = async (): Promise<People[]> => {
  let allCharacters: People[] = [];

  try {
    const firstResponse = await axios.get(FIRST_PAGE_ENDPOINT);
    const { count, results } = firstResponse.data;

    allCharacters = allCharacters.concat(results as People[]);

    const totalPages = Math.ceil(count / results.length) - 1;
    const requests = Array.from(
      { length: totalPages },
      async (_, i) =>
        await axios.get(`https://swapi.dev/api/people?page=${i + 2}`)
    );

    const additionalResponses = await Promise.all(requests);

    const additionalResults = additionalResponses.reduce<People[]>(
      (characters, response) => {
        const { results } = response.data;
        return characters.concat(results as People[]);
      },
      []
    );

    allCharacters = allCharacters.concat(additionalResults);
  } catch (error: unknown | any) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }

  return allCharacters;
};

// The list of characters shall then be sorted in ascending order based on their height.
// If the height of the character is unknown, push the character to the bottom of the list.
// Characters with unknown height shall then be sorted alphabetically based on their name.
export const processCharacters = async (
  characters: People[]
): Promise<CharacterByGender[]> => {
  const characterByGender: CharacterByGender[] = await separateByGender(
    characters
  );
  for (let i = 0; i <= characterByGender.length - 1; i++) {
    const [knownHeight, unknownHeight] = await separateByHeightKnown(
      characterByGender[i].characters
    );
    const knownHeightSorted = await sortByHeight(knownHeight);
    const unknownHeightSorted = await sortByName(unknownHeight);
    characterByGender[i].characters = [
      ...knownHeightSorted,
      ...unknownHeightSorted,
    ];
  }

  return characterByGender;
};

const allCharacters = await fetchAllCharacters();
const processedCharacters = await processCharacters(allCharacters);
await writeToFile("output.json", processedCharacters);
