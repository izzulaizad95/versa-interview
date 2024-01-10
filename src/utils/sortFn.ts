import { CharacterInfo } from "../types/index";

const sortByHeight = async (
  characters: CharacterInfo[]
): Promise<CharacterInfo[]> => {
  return characters.sort((a, b) => a.height - b.height);
};

const sortByName = async (
  characters: CharacterInfo[]
): Promise<CharacterInfo[]> => {
  return characters.sort((a, b) => a.name.localeCompare(b.name));
};

export { sortByHeight, sortByName };
