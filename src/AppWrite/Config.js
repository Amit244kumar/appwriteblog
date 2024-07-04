import conf from "../conf/conf";

import { Client,ID,Databases,Storage,Query } from "appwrite";


export class Service{
    client=new Client()
    Databases;
    bucket
    constructor(){
        this.client
           .setEndpoint(conf.appwriteUrl)
           .setProject(conf.appwriteProjectId);

        this.Databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
         try {
            return await this.Databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )

         } catch (error) {
            throw error
         }
    }

   async updatePost(slug,{title,content,featuredImage,status}){
    
      try {
         return await this.Databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
           {
              title,
              content,
              featuredImage,
              status
           }
        )
      } catch (error) {
          throw error
      }
   }     

   async deletePost(slug){
        try{
            this.Databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
            return true
        } catch (error) {
            console.log("Appwrite service :: detelePost :: error" ,error)
        }
        return false
   }

   async getPost(slug)
   {
        try {
            return await this.Databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
        } catch (error) {
            console.log("Appwrite service :: getPost :: error" ,error)
        }
        return false
   }
  
   async getPosts(Queries =[Query.equal("status","active")]){
     try {
         return await this.Databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,Queries)
     } catch (error) {
        console.log("Appwrite service :: getPosts :: error" ,error)
       
     }
     return false
   } 

    // file upload services

    async uploadFile(file)
    {
        
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error" ,error)
         
        }
        return false
    }

    async deleteFile(fileId){
        try {
            this.bucket.deleteFile(conf.appwriteBucketId,fileId)
            return true
        } catch (error) {
            console.log("Appwrite service :: deteleFile :: error" ,error)
        }
        return false
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
    }
}

const service=new Service()
export default service

