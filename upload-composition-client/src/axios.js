import axios from 'axios'
let request = axios.create({
    baseURL:"/api"
  })
  
  
  request.interceptors.response.use(
    async response=>{
      // header config这里处理就可以了，应用层只需要数据data
      let {data} = response
      // if(dat)
      return data
  
    }
  )

export default request


  