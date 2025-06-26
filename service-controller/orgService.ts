import { APIRequestContext } from "@playwright/test"

export default class OrgService {

    private request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request
    }

    

    async createOrg(token, username) {
        const response = await this.request.post('/api/v1/orgs', {
            data: {
                username: username
            },
            headers: {
                'Authorization': `token ${token}`
            }
        })
        return response
    }

    async deleteOrg(token: string, org: string) {
        return await this.request.delete(`/api/v1/orgs/${org}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    }
    
    async createLabel(token: string, org: string, name: string, color: string) {
        return await this.request.post(`/api/v1/orgs/${org}/labels`, {
            headers: {
                'Authorization': `token ${token}`
            },
            data: {
                name: name,
                color: color
            }
        })
        
    }

    async getLabel(token: string, org: string, id: number) {
        return await this.request.get(`/api/v1/orgs/${org}/labels/${id}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        
        })

    }

    async updateLabel(token: string, org: string, name: string, id: number) {
        return await this.request.patch(`/api/v1/orgs/${org}/labels/${id}`, {
            headers: {
                'Authorization': `token ${token}`
            },
          data: {
                name: name
            }
        
        })

    }

    async deleteLabel(token: string, org: string, id: number) {
        return await this.request.delete(`/api/v1/orgs/${org}/labels/${id}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        
        })

    }



}