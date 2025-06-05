
import { test as base, Page } from '@playwright/test'
import CreateProject from '../pom/CreateProject'

type Fixtures = {
    createProject: CreateProject
};

export const test = base.extend<Fixtures>({
    context: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: 'testUser1-state.json' });
        await use(context)
        await context.close()
       
    },
    createProject: async ({ page }, use) => {
        let createProject = new CreateProject(page)
        await createProject.openPage()
        await use(createProject)
    }

})
