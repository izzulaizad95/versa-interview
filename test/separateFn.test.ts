import { CharacterInfo, People } from "../src/types";
import {
  separateByGender,
  separateByHeightKnown,
} from "../src/utils/separateFn";

describe("separateByGender", () => {
  const characters: People[] = [
    { name: "Luke Skywalker", height: "172", gender: "male" },
    { name: "Leia Organa", height: "150", gender: "female" },
    { name: "Darth Vader", height: "202", gender: "male" },
    { name: "Han Solo", height: "180", gender: "male" },
  ];

  it("should separate male and female characters", async () => {
    const separatedCharacters = await separateByGender(characters);
    expect(separatedCharacters).toEqual([
      {
        gender: "female",
        characters: [{ name: "Leia Organa", height: 150 }],
      },
      {
        gender: "male",
        characters: [
          { name: "Luke Skywalker", height: 172 },
          { name: "Darth Vader", height: 202 },
          { name: "Han Solo", height: 180 },
        ],
      },
    ]);
  });
});

describe("separateByHeightKnown", () => {
  const characters: CharacterInfo[] = [
    { name: "Luke Skywalker", height: 172 },
    { name: "Darth Vader", height: 202 },
    { name: "Han Solo", height: NaN },
  ];

  it("should separate characters by known and unknown height", async () => {
    const separatedCharacters = await separateByHeightKnown(characters);
    expect(separatedCharacters).toEqual([
      [
        { name: "Luke Skywalker", height: 172 },
        { name: "Darth Vader", height: 202 },
      ],
      [{ name: "Han Solo", height: NaN }],
    ]);
  });
});
