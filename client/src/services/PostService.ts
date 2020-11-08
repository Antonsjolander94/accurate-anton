import axios from 'axios'
import Post from '@/interfaces/Post'

const url = "http://localhost:5000/posts/";

class PostService {
  async getPost (id: string): Promise<Post> {
    let response: Post | any = {}
    try {
      const { data, status } = await axios.get(url + id)
      console.log(data)

      if (data && status === 200) {
        response = data
      }
      return response
    } catch (error) {
      response = 
        {
          error: error.response as object,
          flag: false as boolean,
          generalError: 'An error happened' as string
        }
      return response
    }
  }
  async FetchPosts (): Promise<Post[] | any[]> {
    let response: Post[] | any[] = []
    try {
      const { data, status } = await axios({url: url})
      console.log(data)

      if (data && status === 200) {
        response = data
      }
      return response
    } catch (error) {
      response = [
        {
          error: error.response as object,
          flag: false as boolean,
          generalError: 'An error happened' as string
        }
      ]
      return response
    }
  }
}

export default PostService

// import axios from "axios";
// import {Post} from "../types/PostsType"

// const url = "http://localhost:5000/posts";


// class PostService {
//     static getPosts(): Promise<Post[]> {
//         return new Promise(async (resolve, reject)  => {
//             try {
//                 const res = await axios.get(url);
//                 const data = res.data;
//                 resolve(
//                     data.map((post: Post) => ({
//                         ...post,
//                         createdAt: new Date(post.date)
//                     }))
//                 );
//             } catch (error) {
//                 reject(error)
//             }
//         })
//     }
// }

// export default PostService;