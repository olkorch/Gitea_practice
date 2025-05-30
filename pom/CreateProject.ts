import { expect, Locator } from "@playwright/test"
import BasePage from "./BasePage"
import { users } from '../test-data/testUsers'


export default class CreateProject extends BasePage {
    private readonly titleField: Locator = this.page.locator('#_aria_auto_id_0')
    private readonly descriptionField: Locator = this.page.locator('#_combo_markdown_editor_1')
    private readonly templateDropdown: Locator = this.page.locator('div.ui.selection.dropdown:has-text("Select a project template to get started")') //PW selector :has-text()
    private readonly templateNone: Locator = this.page.locator('#_aria_auto_id_14')
    private readonly templateKanban: Locator = this.page.locator('#_aria_auto_id_15')
    private readonly templateBugTriage: Locator = this.page.locator('#_aria_auto_id_16')
    private readonly createButton: Locator = this.page.locator('button.ui.primary.button')
    private readonly cancelButton: Locator = this.page.locator('a.ui.cancel.button')
    

    async openPage() {
        await this.page.goto(`/${users.testUser1.userName}/-/projects/new`)
        // await this.page.waitForLoadState('load')

    }

    async enterTitle(title: string) {
        await this.titleField.fill(title)
    }

    async enterDescription(description: string) {
        await this.descriptionField.fill(description)
    }

    async selectTemplateNone() {
        await this.templateDropdown.click()
        await this.templateNone.click()
    }

    async selectTemplateKanban() {
        await this.templateDropdown.click()
        await this.templateKanban.click()
    }

    async selectTemplateBugTriage() {
        await this.templateDropdown.click()
        await this.templateBugTriage.click()
    }


    
    async clickCreateProject() {
        await this.createButton.click()
    }

    async clickCancelButton() {
        await this.cancelButton.click()
    }
}


    

