import { test, expect } from '@playwright/test'
import { users } from '../../test-data/testUsers'
import OrgService from '../../service controller/OrgService'

//use without apiSetup
test.describe(('Create org endpoint tests'), () => {

    let orgService: OrgService
    
    test.beforeEach(async ({ request }) => {
            orgService = new OrgService(request)    
        })



test('/orgs Create an organization: 201 created', async () => {
    const response = await orgService.createOrg(users.testUser1.apiKey, 'OrgName')

    console.log(await response.status())
    expect(response.status()).toBe(201)

    await orgService.deleteOrg(users.testUser1.apiKey, 'OrgName')
})

test('/orgs Create an organization: 401 unathorized', async () => {
    const response = await orgService.createOrg(undefined, 'OrgName')

    console.log(await response.status())
    expect(response.status()).toBe(401)
})

test('/orgs Create an organization: 422 validation error', async ({ request }) => {
    const response = await orgService.createOrg(users.testUser1.apiKey, undefined)

    console.log(await response.status())
    expect(response.status()).toBe(422)
    })
    
})



//use with apiSetup
test.describe(('Org label tests'), () => {

    let orgService: OrgService
    
    
    // test.beforeAll(async ({ request }) => {

    //     orgService = new OrgService(request)

    //     await orgService.createOrg(users.testUser1.apiKey, 'OrgName')

            
    // })

    test.afterAll(async ({ request }) => {

        orgService = new OrgService(request)

        await orgService.deleteOrg(users.testUser1.apiKey, 'OrgName')

        
    
    })

    test.beforeEach(async ({ request }) => {
            orgService = new OrgService(request)    
        })

    

    test('/orgs/{org}/labels Create a label', async () => {

        const response = await orgService.createLabel(users.testUser1.apiKey, 'OrgName', 'LabelName', '#00aabb')
           
        const body = await response.json()    
        console.log(await response.status())
        expect(response.status()).toBe(201)
        expect(body).toHaveProperty('name')
        expect(body).toHaveProperty('color')
        expect(body).toHaveProperty('id')
        
        
    })

    test('/orgs/{org}/labels/{id} Get a label', async () => {

        const response = await orgService.createLabel(users.testUser1.apiKey, 'OrgName', 'LabelName', '#00aabb')       
        
        const bodyPost = await response.json()
        const id = bodyPost.id

        const response1 = await orgService.getLabel(users.testUser1.apiKey, 'OrgName', id)
                    
        const bodyGet = await response1.json()    
        console.log(await response1.status())
        expect(response1.status()).toBe(200)
        expect(bodyGet).toHaveProperty('name')
        expect(bodyGet).toHaveProperty('color')
        expect(bodyGet).toHaveProperty('id')
        expect(bodyGet.id).toBe(id)
          
        
    })
  
    test('/orgs/{org}/labels/{id} Delete a label', async () => {

        const response = await orgService.createLabel(users.testUser1.apiKey, 'OrgName', 'LabelName', '#00aabb')       
        
        const bodyPost = await response.json()
        const id = bodyPost.id
        
        const response1 = await orgService.deleteLabel(users.testUser1.apiKey, 'OrgName', id)           
            
        console.log(await response1.status())
        expect(response1.status()).toBe(204)       
          
        
    })

    test('/orgs/{org}/labels/{id} Update a label', async () => {
         

        const response = await orgService.createLabel(users.testUser1.apiKey, 'OrgName', 'LabelName', '#00aabb')
       
        
        const bodyPost = await response.json()        
        const id = bodyPost.id
        
        const response1 = await orgService.updateLabel(users.testUser1.apiKey, 'OrgName', 'NewLabelName', id)
        
            
        const bodyPatch = await response1.json()    
        console.log(await response1.status())
        expect(response1.status()).toBe(200)
        expect(bodyPatch).toHaveProperty('name')
        expect(bodyPatch.name).toBe('NewLabelName')          
        
    }) 


})



