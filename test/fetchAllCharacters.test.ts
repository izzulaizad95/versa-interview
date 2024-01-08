import { jest } from "@jest/globals";
import axios from "axios";
import { fetchAllCharacters } from "../src/index";

jest.mock("axios");

describe("fetchAllCharacters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockedAxios = jest.mocked(axios);

  it("should fetch all characters successfully", async () => {
    const FIRST_PAGE_ENDPOINT = "https://swapi.dev/api/people?page=1";

    const firstResponseData = {
      count: 10,
      next: "https://swapi.dev/api/people?page=2",
      results: [
        { name: "Luke Skywalker", height: "172", gender: "male" },
        { name: "Leia Organa", height: "150", gender: "female" },
      ],
    };

    const secondResponseData = {
      count: 10,
      next: null,
      results: [
        { name: "Darth Vader", height: "202", gender: "male" },
        { name: "Rugor Nass", height: "206", gender: "male" },
      ],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: firstResponseData });
    mockedAxios.get.mockResolvedValueOnce({ data: secondResponseData });

    const result = await fetchAllCharacters();

    expect(result).toHaveLength(4);
    expect(result).toEqual([
      ...firstResponseData.results,
      ...secondResponseData.results,
    ]);

    // Ensure Axios.get is called twice with the correct arguments
    expect(mockedAxios.get).toHaveBeenCalledWith(FIRST_PAGE_ENDPOINT);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://swapi.dev/api/people?page=2"
    );
  });

  it("should throw an error if fetching fails", async () => {
    const errorMessage = "Failed to fetch characters";
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(fetchAllCharacters()).rejects.toThrow(errorMessage);
  });

  // Add more test cases as needed...
});
