import { expect } from '@playwright/test'
import { test } from '../../fixtures/createProjectsFixture' 
import SignInPage from '../../pom/SignInPage'
import { users } from '../../test-data/testUsers'
import Projects from '../../pom/Projects'


test.describe(('Projects tests'), () => {

    let signInPage: SignInPage    
    let projects: Projects

    
        test.beforeEach(async ({ page }) => {
            signInPage = new SignInPage(page)
            projects = new Projects(page)   
          
    
        })
    
    test('New Project', async ({createProjects, page }) => {
        await projects.newProject()
        await expect(page).toHaveURL(`/${users.testUser1.userName}/-/projects/new`)
        await createProjects.clickCancelButton()
        await projects.deleteProject()
        await projects.confirmDeletion()
       
    })

    test('Delete project', async ({createProjects, page }) => {
        await projects.deleteProject()
        await projects.confirmDeletion()
        await expect (page.locator('div.ui.positive.message.flash-message.flash-success')).toHaveText('The project has been deleted.')
    })

    test('Edit project', async ({createProjects, page }) => {
        await projects.editProject()
        await expect(page.locator('h2:has-text("Edit Project")')).toBeVisible()
        await createProjects.clickCancelButton()
        await page.locator('button.item.btn.delete-button').click()
        await projects.confirmDeletion()
    })

    test('Close project', async ({createProjects, page }) => {
        await projects.closeProject()
        await expect(page.locator('button.item.btn.link-action > svg.svg.octicon-check')).toBeVisible()
        await page.locator('button.item.btn.delete-button').click()
        await projects.confirmDeletion()
    })

    test('Closed projects tab', async ({createProjects, page }) => {
        await projects.closeProject()
        await expect(page.locator('button.item.btn.link-action > svg.svg.octicon-check')).toBeVisible()
        await projects.openPage()
        await projects.openClosedTab()
        await expect(page.locator('a:has-text("TitleText")')).toBeVisible()
        await projects.deleteProject()
        await projects.confirmDeletion()
    })


    test('Search project', async ({createProjects, page }) => {
        await createProjects.openPage()
        await createProjects.enterTitle('NewText')
        await createProjects.clickCreateProject()
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

