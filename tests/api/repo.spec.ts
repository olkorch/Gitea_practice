import { test, expect } from '@playwright/test'
import { users } from '../../test-data/testUsers'
import RepoService from '../../service controller/repoService'



//use without apiSetup
test.describe(('Create repo endpoint tests'), () => {

    let repoService: RepoService

    test.beforeEach(async ({ request }) => {
        repoService = new RepoService(request)
    })


test('user/repos Create a repository: 201 created', async () => {    

    const response = await repoService.createRepo(users.testUser1.apiKey, 'newRepo')

    console.log(await response.status())
    expect(response.status()).toBe(201)
       
    await repoService.deleteRepo(users.testUser1.apiKey, 'newRepo', users.testUser1.userName)

    
})

test('user/repos Create a repository: 401 unathorized', async () => {
    const response = await repoService.createRepo(undefined, 'newRepo')

    console.log(await response.status())
    expect(response.status()).toBe(401)
})


test('user/repos Create a repository: 409 name exists', async () => {
    await repoService.createRepo(users.testUser1.apiKey, 'repoName')

    const response = await repoService.createRepo(users.testUser1.apiKey, 'repoName')

    console.log(await response.status())
    expect(response.status()).toBe(409)

    await repoService.deleteRepo(users.testUser1.apiKey, 'repoName', users.testUser1.userName)
})


test('user/repos Create a repository: 422 name is not specified', async () => {
    const response = await repoService.createRepo(users.testUser1.apiKey, undefined)

    console.log(await response.status())
    expect(response.status()).toBe(422)
})
    
})





//use with apiSetup
test.describe(('Repo wiki tests'), () => {

    let repoService: RepoService
    
    // test.beforeAll(async ({ request }) => {
    //     repoService = new RepoService(request)
    //     await repoService.createRepo(users.testUser1.apiKey, 'repoWithWiki')    
    // })

    test.afterAll(async ({ request }) => {
        repoService = new RepoService(request)        
        await repoService.deleteRepo(users.testUser1.apiKey, 'repoWithWiki', users.testUser1.userName)    
    })

    test.beforeEach(async ({ request }) => {
        repoService = new RepoService(request)
    })


    test.afterEach(async ({ request }) => {
        repoService = new RepoService(request)
        await repoService.deleteWikiPage(users.testUser1.apiKey, 'repoWithWiki', users.testUser1.userName, 'WikiPage')
    })

    test('/repos/{owner}/{repo}/wiki/new Create a wiki page', async () => {

        const response = await repoService.createWikiPage(users.testUser1.apiKey, 'repoWithWiki', users.testUser1.userName, 'WikiPage')
    
        const body = await response.json()    
        console.log(await response.status())
        expect(response.status()).toBe(201)
        expect(body).toHaveProperty('title')
        expect(body).toHaveProperty('footer')
        expect(body).toHaveProperty('html_url')
        
    })

    test('/repos/{owner}/{repo}/wiki/page/{pageName} Get a wiki page', async () => {
        
        await repoService.createWikiPage(users.testUser1.apiKey, 'repoWithWiki', users.testUser1.userName, 'WikiPage')

        const response = await repoService.getWikiPage(users.testUser1.apiKey, 'repoWithWiki', users.testUser1.userName, 'WikiPage')
    
        const body = await response.json()    
        console.log(await response.status())
        expect(response.status()).toBe(200)
        expect(body).toHaveProperty('title')
        expect(body).toHaveProperty('footer')
        expect(body).toHaveProperty('html_url')
          
        
    })
  
    
test('/repos/{owner}/{repo}/wiki/page/{pageName} Edit a wiki page', async () => {

        await repoService.createWikiPage(users.testUser1.apiKey, 'repoWithWiki', users.testUser1.userName, 'WikiPage')

        const response = await repoService.updateWikiPage(users.testUser1.apiKey, 'repoWithWiki', users.testUser1.userName, 'WikiPage', 'NewTitle')

        const body = await response.json()    
        console.log(await response.status())
        expect(response.status()).toBe(200)
        expect(body.title).toBe('NewTitle')        
          
        
    })
  


})


