import { test, expect } from '@playwright/test'
import CreateProject from '../pom/CreateProject'
import SignInPage from '../pom/SignInPage'
import { users } from '../test-data/testUsers'
import Projects from '../pom/Projects'


test.describe(('Projects tests'), () => {

    let signInPage: SignInPage
    let createProject: CreateProject
    let projects: Projects
        test.beforeEach(async ({ page }) => {
            signInPage = new SignInPage(page)
            createProject = new CreateProject(page)
            projects = new Projects(page)
    
            await signInPage.openPage()
            await signInPage.signInWithCredentials(users.testUser1.userName, users.testUser1.password)
            await createProject.openPage()

            await createProject.enterTitle('TitleText')
            await createProject.clickCreateProject()
    
        })
    
    test('New Project', async ({ page }) => {
        await projects.newProject()
        await expect(page).toHaveURL(`/${users.testUser1.userName}/-/projects/new`)
        await createProject.clickCancelButton()
        await projects.deleteProject()
        await projects.confirmDeletion()
       
    })

    test('Delete project', async ({ page }) => {
        await projects.deleteProject()
        await projects.confirmDeletion()
        await expect (page.locator('div.ui.positive.message.flash-message.flash-success')).toHaveText('The project has been deleted.')
    })

    test('Edit project', async ({ page }) => {
        await projects.editProject()
        await expect(page.locator('h2:has-text("Edit Project")')).toBeVisible()
        await createProject.clickCancelButton()
        await page.locator('button.item.btn.delete-button').click()
        await projects.confirmDeletion()
    })

    test('Close project', async ({ page }) => {
        await projects.closeProject()
        await expect(page.locator('button.item.btn.link-action > svg.svg.octicon-check')).toBeVisible()
        await page.locator('button.item.btn.delete-button').click()
        await projects.confirmDeletion()
    })

    test('Closed projects tab', async ({ page }) => {
        await projects.closeProject()
        await expect(page.locator('button.item.btn.link-action > svg.svg.octicon-check')).toBeVisible()
        await projects.openPage()
        await projects.openClosedTab()
        await expect(page.locator('a:has-text("TitleText")')).toBeVisible()
        await projects.deleteProject()
        await projects.confirmDeletion()
    })


    test('Search project', async ({ page }) => {
        await createProject.openPage()
        await createProject.enterTitle('NewText')
        await createProject.clickCreateProject()
        await projects.fillSearchField('NewText')
        await projects.clickSearchButton()
        await expect(page.locator('a:has-text("TitleText")')).not.toBeVisible()
        await expect(page.locator('a:has-text("NewText")')).toBeVisible()
        await projects.deleteProject()
        await projects.confirmDeletion()
        await projects.deleteProject()
        await projects.confirmDeletion()
    })


      
})

