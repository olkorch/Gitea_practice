import { test } from '../fixtures/createProjectPageFixture' 
import { expect } from '@playwright/test'       
import SignInPage from '../pom/SignInPage'
import { users } from '../test-data/testUsers'
import Projects from '../pom/Projects'



test.describe(('Create project tests'), () => {

    let signInPage: SignInPage
    let projects: Projects
    
        test.beforeEach(async ({ page }) => {
            signInPage = new SignInPage(page)
            projects = new Projects(page)
    
        
    
    })

    test('New project only with title', async ({createProject, page }) => {
        await createProject.enterTitle('TitleOnly')
        await createProject.clickCreateProject()
        await expect(page.locator('div.ui.positive.message.flash-message.flash-success')).toHaveText('The project "TitleOnly" has been created.')
        await projects.deleteProject()
        await projects.confirmDeletion()
    })

    test('New project with template None', async ({createProject, page }) => {
        await createProject.enterTitle('TemplateNone')
        await createProject.selectTemplateNone()
        await createProject.clickCreateProject()
        await expect(page.locator('div.ui.positive.message.flash-message.flash-success')).toHaveText('The project "TemplateNone" has been created.')
        await projects.deleteProject()
        await projects.confirmDeletion()
        
    })

    test('New project with description', async ({createProject, page }) => {
        await createProject.enterTitle('ProjectWithDescription')
        await createProject.enterDescription('DescriptionText')
        await createProject.clickCreateProject()
        await expect(page.locator('div.ui.positive.message.flash-message.flash-success')).toHaveText('The project "ProjectWithDescription" has been created.')
        await page.locator('a:has-text("ProjectWithDescription")').click()
        await expect(page.locator('p[dir="auto"]')).toHaveText("DescriptionText")
        await page.locator('button.item.btn.delete-button').click()
        await projects.confirmDeletion()

    })


    test('New project with template Kanban', async ({createProject, page }) => {
        await createProject.enterTitle('TemplateKanban')
        await createProject.selectTemplateKanban()
        await createProject.clickCreateProject()
        await expect(page.locator('div.ui.positive.message.flash-message.flash-success')).toHaveText('The project "TemplateKanban" has been created.')
        await page.locator('a:has-text("TemplateKanban")').click()
        await expect(page.locator('div.project-column-title-label.gt-ellipsis:has-text("To Do")')).toBeVisible()
        await page.locator('button.item.btn.delete-button').click()
        await projects.confirmDeletion()
    })

    test('New project with template BugTriage', async ({createProject, page }) => {
        await createProject.enterTitle('TemplateBugTriage')
        await createProject.selectTemplateBugTriage()
        await createProject.clickCreateProject()
        await expect(page.locator('div.ui.positive.message.flash-message.flash-success')).toHaveText('The project "TemplateBugTriage" has been created.')
        await page.locator('a:has-text("TemplateBugTriage")').click()
        await expect(page.locator('div.project-column-title-label.gt-ellipsis:has-text("Needs Triage")')).toBeVisible()
        await page.locator('button.item.btn.delete-button').click()
        await projects.confirmDeletion()
    })

    
    test('Cancel Project Creation', async ({createProject, page }) => {
        await createProject.clickCancelButton()
        await expect(page).toHaveURL(`/${users.testUser1.userName}/-/projects`)
    })

   
})