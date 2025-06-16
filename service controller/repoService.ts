import { APIRequestContext } from "@playwright/test"

export default class RepoService {

    private request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request
    }

    

    async createRepo(token, name) {
        const response = await this.request.post('/api/v1/user/repos', {
            data: {
                name: name
            },
            headers: {
                'Authorization': `token ${token}`
            }
        })
        return response
    }

    async deleteRepo(token: string, repo: string, owner: string) {
        return await this.request.delete(`http://localhost:3000/api/v1/repos/${owner}/${repo}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    }
    
    async createWikiPage(token: string, repo: string, owner: string, title: string) {
        return await this.request.post(`http://localhost:3000/api/v1/repos/${owner}/${repo}/wiki/new`, {
            headers: {
                'Authorization': `token ${token}`
            },
            data: {
                title: title
            }
        })
        
    }

    async getWikiPage(token: string, repo: string, owner: string, pageName: string) {
        return await this.request.get(`http://localhost:3000/api/v1/repos/${owner}/${repo}/wiki/page/${pageName}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        
        })

    }

    async updateWikiPage(token: string, repo: string, owner: string, pageName: string, newPageName: string) {
        return await this.request.patch(`http://localhost:3000/api/v1/repos/${owner}/${repo}/wiki/page/${pageName}`, {
            headers: {
                'Authorization': `token ${token}`
            },
          data: {
                title: newPageName
            }
        
        })

    }

    async deleteWikiPage(token: string, repo: string, owner: string, pageName: string) {
        return await this.request.delete(`http://localhost:3000/api/v1/repos/${owner}/${repo}/wiki/page/${pageName}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        
        })

    }





}