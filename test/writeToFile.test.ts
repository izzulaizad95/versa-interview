import { jest } from "@jest/globals";
import { writeToFile } from "../src/utils/writeToFile";

jest.mock("fs/promises");

jest.mock("fs", () => ({
  promises: {
    writeFile: jest.fn().mockResolvedValue({} as never),
  },
}));

describe("writeToFile", () => {
  it("should write data to a file", async () => {
    const result = await writeToFile("output_test.json", [
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
    expect(result).toEqual("File written successfully!");
  });
});
