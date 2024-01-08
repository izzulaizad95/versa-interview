import { CharacterInfo } from "../src/types";
import { sortByHeight, sortByName } from "../src/utils/sortFn";

describe("Sort Functions", () => {
  const characters: CharacterInfo[] = [
    { name: "Luke Skywalker", height: 172 },
    { name: "Darth Vader", height: 202 },
    { name: "Leia Organa", height: 150 },
  ];

  describe("sortByHeight", () => {
    it("should sort characters by height in ascending order", async () => {
      const sortedCharacters = await sortByHeight(characters);
      expect(sortedCharacters).toEqual([
        { name: "Leia Organa", height: 150 },
        { name: "Luke Skywalker", height: 172 },
        { name: "Darth Vader", height: 202 },
      ]);
    });
  });

  describe("sortByName", () => {
    it("should sort characters by name in alphabetical order", async () => {
      const sortedCharacters = await sortByName(characters);
      expect(sortedCharacters).toEqual([
        { name: "Darth Vader", height: 202 },
        { name: "Leia Organa", height: 150 },
        { name: "Luke Skywalker", height: 172 },
      ]);
    });
  });
});
