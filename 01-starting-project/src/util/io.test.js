import { expect, it, vi } from "vitest"
import writeData from "./io"
import { promises as fs } from "fs"

// * we want to avoid the side effect of writing data to the file system
// * we can mock that step in our test

// * previous test with side effect:

// it("should write data to a file", async () => {
//   const testData = "I am making progress day by day"
//   const testFileName = "Test.txt"

//   const result = await writeData(testData, testFileName)

//   expect(result).toBeUndefined()
// })

// * new tests with mocks:

vi.mock("fs")

// since path is the default object for the module, we have to use the default key
vi.mock("path", () => {
  return {
    default: {
      join: (...args) => {
        return args[args.length - 1]
      },
    },
  }
})

it("should return a promise that resolves to no value if called correctly", () => {
  const testData = "I am making progress day by day"
  const testFileName = "Test.txt"

  // const result = await writeData(testData, testFileName)

  return expect(writeData(testData, testFileName)).resolves.toBeUndefined()
})

it("should execute writeFile()", () => {
  const testData = "I am making progress day by day"
  const testFileName = "Test.txt"

  writeData(testData, testFileName)

  expect(fs.writeFile).toBeCalled()
})

it("should execute writeFile() with path and data arguments", () => {
  const testData = "I am making progress day by day"
  const testFileName = "Test.txt"

  writeData(testData, testFileName)

  expect(fs.writeFile).toBeCalledWith(testFileName, testData)
})
