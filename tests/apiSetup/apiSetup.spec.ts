import { test, expect } from '@playwright/test'
import { getTestUsers } from '../../test-data/testUsers';
import OrgService from '../../service-controller/orgService'
import RepoService from '../../service-controller/repoService'

const users = getTestUsers();
const testUser1 = users.randomUser1; 






test.describe(('Create org and repo pre-conditions'), () => {

    let orgService: OrgService
    let repoService: RepoService

    test('Create Org', async ({ request }) => {    
            orgService = new OrgService(request)    
            await orgService.createOrg(testUser1.apiKey, 'OrgName')    
                
    })

    test('Create Repo', async ({ request }) => {
            repoService = new RepoService(request)
            await repoService.createRepo(testUser1.apiKey, 'repoWithWiki')    
    })

})