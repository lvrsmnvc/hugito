jest.disableAutomock();

import App from '../components/app/App.jsx'

describe('App', () => {
    let app
    beforeEach(() => {
        app = new App()
    })

    afterEach(() => {
        app = undefined
    })
    describe("When filtering the header of a content file", () => {
        describe("and there is no header to filter", () => {
            it("should return the same content", () => {
                let content = 'Some content with no header'
                expect(app.filterContentHeader(content)).toBe(content)
            })
        })
    })
    describe("When filtering the header of a content file", () => {
        describe("and there is an header to filter", () => {
            it("should return the filered content", () => {
                let content = '+++\r\nCategories = [\"Development\", \"GoLang\"]\r\n\r\n+++\r\n\r\nSome text'
                expect(app.filterContentHeader(content)).toBe("Some text")
            })
        })
    })
    describe("When filtering the body of a content file", () => {
        describe("and there is no body to filter", () => {
            it("should return the same header", () => {
                let content = '+++\r\nCategories = [\"Development\", \"GoLang\"]\r\n\r\n+++\r\n\r\n'
                expect(app.filterContentBody(content)).toBe(content)
            })
        })
    })
    describe("When filtering the header of a content file", () => {
        describe("and there is an header to filter", () => {
            it("should return the filered content", () => {
                let expectedContent = '+++\r\nCategories = [\"Development\", \"GoLang\"]\r\n\r\n+++\r\n\r\n'
                let content = '+++\r\nCategories = [\"Development\", \"GoLang\"]\r\n\r\n+++\r\n\r\nSome text'
                expect(app.filterContentBody(content)).toBe(expectedContent)
            })
        })
    })
    describe("When unsetting the header draft", () => {
        it("should set draft to false", () => {
            let expectedContent = '+++\r\n\r\ndraft = \"false\"\r\n\r\n+++\r\n\r\n'
            let content = '+++\r\n\r\ndraft = \"true\"\r\n\r\n+++\r\n\r\n'
            expect(app.unsetDraft(content)).toBe(expectedContent)
        })
    })
})
