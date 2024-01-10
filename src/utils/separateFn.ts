import {
  CharacterByGender,
  CharacterInfo,
  Gender,
  People,
  Unknown,
} from "index";

const separateByGender = async (
  characters: People[]
): Promise<CharacterByGender[]> => {
  let charactersByGender: CharacterByGender[] = [];
  const genderObj: Record<Gender | Unknown, CharacterInfo[]> = {} as Record<
    Gender | Unknown,
    CharacterInfo[]
  >;
  for (let i = 0; i < characters.length; i++) {
    const currCharacter = characters[i];
    const characterInfo = {
      name: currCharacter.name,
      height: parseInt(currCharacter.height),
    };

    if (
      genderObj[currCharacter.gender] === null ||
      genderObj[currCharacter.gender] === undefined
    ) {
      genderObj[currCharacter.gender] = [characterInfo];
    } else {
      genderObj[currCharacter.gender].push(characterInfo);
    }
  }
  const genderArray = Object.keys(genderObj).sort();
  for (let i = 0; i <= genderArray.length - 1; i++) {
    charactersByGender.push({
      gender: genderArray[i],
      characters: genderObj[genderArray[i] as Gender | Unknown],
    });
  }
  return charactersByGender;
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

export { separateByGender, separateByHeightKnown };
