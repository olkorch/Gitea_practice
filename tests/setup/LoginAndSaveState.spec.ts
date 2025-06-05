import { test, expect } from '@playwright/test';
import SignInPage from '../../pom/SignInPage';
import { users } from '../../test-data/testUsers';



test.describe(('Storage state save'), () => {

    let signInPage: SignInPage
          
   

    test('Login and save state', async ({ page }) => {
        signInPage = new SignInPage(page) 
        await signInPage.openPage()
        await signInPage.signInWithCredentials(users.testUser1.userName, users.testUser1.password)
        await page.context().storageState({ path: 'testUser1-state.json' })
        await expect(page.locator('//span[@class="text truncated-item-container"]//span[@class="truncated-item-name"]')).toHaveText(users.testUser1.userName)
    })

    
})

