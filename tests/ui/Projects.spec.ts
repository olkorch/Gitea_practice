import { test, expect } from '@playwright/test'
import CreateProject from '../../pom/pages/CreateProject'
import SignInPage from '../../pom/pages/SignInPage'
import Projects from '../../pom/pages/Projects'
import { getTestUsers } from '../../test-data/testUsers';

const users = getTestUsers();
const testUser1 = users.randomUser1; 


test.describe(('Projects tests'), () => {

    let signInPage: SignInPage
    let createProject: CreateProject
    let projects: Projects
    test.use({ storageState: 'test-data/states/testUser1-state.json'})
        test.beforeEach(async ({ page }) => {
            signInPage = new SignInPage(page)
            createProject = new CreateProject(page)
            projects = new Projects(page)
    
            // await signInPage.openPage()
            // await signInPage.signInWithCredentials(users.testUser1.userName, users.testUser1.password)
            await createProject.openPage()

            await createProject.enterTitle('TitleText')
            await createProject.clickCreateProject()
    
        })
    
    test('New Project', async ({ page }) => {
        await projects.newProject()
        await expect(page).toHaveURL(`/${testUser1.userName}/-/projects/new`)
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

