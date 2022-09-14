import { describe, expect, it, vi } from "vitest"
import { generateReportData } from "./data"

describe("generateReportData()", () => {
  it("should execute logFn if provided", () => {
    // * we are not interested in testing whether the console.log api works
    // * we are interested in finding out whether it was called

    // * we can use a "spy" i.e. an empty fn as shown below
    const logger = vi.fn()

    // logger.mockImplementationOnce(() => {
    //   // a custom implementation that will be used only for this scenario
    // })

    generateReportData(logger)

    expect(logger).toBeCalled()
  })
})
