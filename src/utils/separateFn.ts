import { CharacterInfo, People } from "index";

const separateMaleFemale = async (
  characters: People[]
): Promise<CharacterInfo[][]> => {
  const maleCharacters: CharacterInfo[] = [];
  const femaleCharacters: CharacterInfo[] = [];
  for (let i = 0; i < characters.length; i++) {
    const currCharacter = characters[i];
    const characterInfo = {
      name: currCharacter.name,
      height: parseInt(currCharacter.height),
    };

    if (currCharacter.gender.toLowerCase() === "male") {
      maleCharacters.push(characterInfo);
    } else {
      femaleCharacters.push(characterInfo);
    }
  }
  return [maleCharacters, femaleCharacters];
};

const separateByHeightKnown = async (
  characters: CharacterInfo[]
): Promise<CharacterInfo[][]> => {
  const knownHeight: CharacterInfo[] = [];
  const unknownHeight: CharacterInfo[] = [];
  for (let i = 0; i < characters.length; i++) {
    const currCharacter = characters[i];

    if (!isNaN(currCharacter.height) || !currCharacter.height === null) {
      knownHeight.push(currCharacter);
    } else {
      unknownHeight.push(currCharacter);
    }
  }
  return [knownHeight, unknownHeight];
};

export { separateByHeightKnown, separateMaleFemale };
