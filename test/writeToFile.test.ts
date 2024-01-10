import { jest } from "@jest/globals";
import { writeToFile } from "../src/index";

jest.mock("fs", () => ({
  promises: {
    writeFile: jest.fn().mockResolvedValue({} as never),
    readFile: jest.fn().mockResolvedValue({} as never),
  },
}));

describe("writeToFile", () => {
  it("should write data to a file", () => {
    const result = writeToFile([
      {
        gender: "hermaphrodite",
        characters: [
          {
            name: "Jabba Desilijic Tiure",
            height: 175,
          },
        ],
      },
    ]);
    expect(result).toEqual("File written successfully");
  });
});
