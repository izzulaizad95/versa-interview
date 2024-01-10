import { jest } from "@jest/globals";
import axios from "axios";
import { People } from "../src/types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
axios.get = jest.fn() as jest.MockedFunction<typeof axios.get>;
const mockFetchAllCharacters = jest.fn<() => Promise<People[]>>();

const FIRST_PAGE_ENDPOINT = "https://swapi.dev/api/people?page=1";
const SECOND_PAGE_ENDPOINT = "https://swapi.dev/api/people?page=2";

describe("fetchAllCharacters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all characters successfully", async () => {
    const firstResponseData = {
      data: {
        results: [
          { name: "Luke Skywalker", height: "172", gender: "male" },
          { name: "Leia Organa", height: "150", gender: "female" },
        ],
      },
    };

    const secondResponseData = {
      data: {
        results: [
          { name: "Darth Vader", height: "202", gender: "male" },
          { name: "Rugor Nass", height: "206", gender: "male" },
        ],
      },
    };

    mockedAxios.get.mockImplementation((url): any => {
      switch (url) {
        case FIRST_PAGE_ENDPOINT:
          return Promise.resolve(firstResponseData);
        case SECOND_PAGE_ENDPOINT:
          return Promise.resolve(secondResponseData);
        default:
          return Promise.reject(new Error("not found"));
      }
    });

    await Promise.all([
      axios.get(FIRST_PAGE_ENDPOINT).then((response) => {
        expect(response.data).toEqual(firstResponseData.data);
      }),
      axios.get(SECOND_PAGE_ENDPOINT).then((response) => {
        expect(response.data).toEqual(secondResponseData.data);
      }),
    ]);

    const fetchAllCharactersResult: People[] = [
      ...(firstResponseData.data.results as People[]),
      ...(secondResponseData.data.results as People[]),
    ];

    mockFetchAllCharacters.mockReturnValueOnce(
      Promise.resolve(fetchAllCharactersResult)
    );
    const result = await mockFetchAllCharacters();

    expect(result).toHaveLength(4);
    expect(result).toEqual(fetchAllCharactersResult);

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(mockedAxios.get).toHaveBeenCalledWith(FIRST_PAGE_ENDPOINT);
    expect(mockedAxios.get).toHaveBeenCalledWith(SECOND_PAGE_ENDPOINT);
  });

  it("should throw an error if fetching fails", async () => {
    const errorMessage = "Failed to fetch characters";
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    axios.get(FIRST_PAGE_ENDPOINT).catch((error) => {
      expect(error.message).toEqual(errorMessage);
    });
  });
});
