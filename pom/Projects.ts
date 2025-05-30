import { expect, Locator } from "@playwright/test"
import BasePage from "./BasePage"
import { users } from '../test-data/testUsers'

export default class Projects extends BasePage {
    private readonly newProjectButton: Locator = this.page.locator('a.ui.small.primary.button')
    private readonly deleteButton: Locator = this.page.locator('a.delete-button')
    private readonly closeButton: Locator = this.page.locator('a.link-action.flex-text-inline > svg.svg.octicon-skip')
    private readonly editButton: Locator = this.page.locator('a.flex-text-inline > svg.svg.octicon-pencil')
    private readonly deleteYesButton: Locator = this.page.locator('button:has-text("Yes")')
    private readonly searchField: Locator = this.page.locator('input[type="search"]')
    private readonly searchButton: Locator = this.page.locator('button.ui.small.icon.button > svg.svg.octicon-search')
    private readonly closedTabButton: Locator = this.page.locator('a.item:has-text("Closed")')
    
   
    async openPage() {
        await this.page.goto(`/${users.testUser1.userName}/-/projects`)
        // await this.page.waitForLoadState('load')

    }

    async deleteProject() {
        await this.deleteButton.click()
    }

    async closeProject() {
        await this.closeButton.click()
    }

    async editProject() {
        await this.editButton.click()
    }

    async confirmDeletion() {
        await this.deleteYesButton.click()
    }

    async newProject() {
        await this.newProjectButton.click()
    }

    async fillSearchField(query: string) {
        await this.searchField.fill(query)
    }

    async clickSearchButton() {
        await this.searchButton.click()
    }

    async openClosedTab() {
        await this.closedTabButton.click()
    }

   
}

