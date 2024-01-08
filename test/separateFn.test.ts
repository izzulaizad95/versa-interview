import { CharacterInfo, People } from "../src/types";
import {
  separateByHeightKnown,
  separateMaleFemale,
} from "../src/utils/separateFn";

describe("separateMaleFemale", () => {
  const characters: People[] = [
    { name: "Luke Skywalker", height: "172", gender: "male" },
    { name: "Leia Organa", height: "150", gender: "female" },
    { name: "Darth Vader", height: "202", gender: "male" },
    { name: "Han Solo", height: "180", gender: "male" },
  ];

  it("should separate male and female characters", async () => {
    const separatedCharacters = await separateMaleFemale(characters);
    expect(separatedCharacters).toEqual([
      [
        { name: "Luke Skywalker", height: 172 },
        { name: "Darth Vader", height: 202 },
        { name: "Han Solo", height: 180 },
      ],
      [{ name: "Leia Organa", height: 150 }],
    ]);
  });
});

describe("separateByHeightKnown", () => {
  const characters: CharacterInfo[] = [
    { name: "Luke Skywalker", height: 172 },
    { name: "Leia Organa", height: 150 },
    { name: "Darth Vader", height: 202 },
    { name: "Han Solo", height: NaN },
  ];

  it("should separate characters by known and unknown height", async () => {
    const separatedCharacters = await separateByHeightKnown(characters);
    expect(separatedCharacters).toEqual([
      [
        { name: "Luke Skywalker", height: 172 },
        { name: "Leia Organa", height: 150 },
        { name: "Darth Vader", height: 202 },
      ],
      [{ name: "Han Solo", height: NaN }],
    ]);
  });
});
