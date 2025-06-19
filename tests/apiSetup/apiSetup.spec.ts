import { test, expect } from '@playwright/test'
import { users } from '../../test-data/testUsers'
import OrgService from '../../service-controller/orgService'
import RepoService from '../../service-controller/repoService'



test.describe(('Create org and repo pre-conditions'), () => {

    let orgService: OrgService
    let repoService: RepoService

    test('Create Org', async ({ request }) => {    
            orgService = new OrgService(request)    
            await orgService.createOrg(users.testUser1.apiKey, 'OrgName')    
                
    })

    test('Create Repo', async ({ request }) => {
            repoService = new RepoService(request)
            await repoService.createRepo(users.testUser1.apiKey, 'repoWithWiki')    
    })

})