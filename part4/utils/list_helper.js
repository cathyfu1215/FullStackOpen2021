/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */


//blogs is a list of blog items
const _ =require('lodash')

const dummy = (blogs) => {
    return 1
  }
  

const totalLikes =(blogs) =>{
 
    const blogLikes=[]

    for(i=0;i<blogs.length;i++){
      blogLikes.push(blogs[i].likes)
    }


    const reducer=(sum,item)=>{
      return sum+item
    }
    
    return blogLikes.length===0
    ? 0
    : blogLikes.reduce(reducer,0)
  }

const favoriteBlog=(blogs)=>{
  
  const BlogWithMostLikes={
    title:"",
    author:"",
    likes:""}

    const blogLikes=[]

   
    for(i=0;i<blogs.length;i++){
      blogLikes.push(blogs[i].likes)
    }
  

  //console.log("blogLikes the array with numbers", blogLikes)

  const largest=Math.max(...blogLikes)
  //console.log("largest number", largest)

  const equalToLargest=(element)=>element===largest

  const mostlikedindex=blogLikes.findIndex(equalToLargest)


  //console.log("index of largest number", mostlikedindex)

    BlogWithMostLikes.title=blogs[mostlikedindex].title
    BlogWithMostLikes.author=blogs[mostlikedindex].author
    BlogWithMostLikes.likes=blogs[mostlikedindex].likes
    

   // console.log(BlogWithMostLikes)
  return BlogWithMostLikes
  
}

const mostBlogs=(blogs)=>{

  //using lodash to find unique authors
  const duplicatedauthors=blogs.map(b=>b.author)
  const uniqueauthors=_.sortedUniq(duplicatedauthors)
  console.log("unique authors:",uniqueauthors)
  
  //count each author's blog number
  const blogNumberArray=new Array(uniqueauthors.length).fill(0)
  for(i=0;i<uniqueauthors.length;i++){
      blogs.forEach(blog => {

        if(blog.author===uniqueauthors[i]){
          blogNumberArray[i]++
        }
        
      });
    }

      console.log("blog number array:",blogNumberArray)

      const maxBlogNumber=Math.max(...blogNumberArray)
      console.log("max blog number:", maxBlogNumber)

      const index=_.indexOf(blogNumberArray,maxBlogNumber)
      const authorToFind=uniqueauthors[index]


  const authorObject={
    author:authorToFind,
    blogs:maxBlogNumber
  }

  return authorObject


}
const mostLikes=(blogs)=>{
  //using lodash to find unique authors
  const duplicatedauthors=blogs.map(b=>b.author)
  const uniqueauthors=_.sortedUniq(duplicatedauthors)
  console.log("unique authors:",uniqueauthors)

  //add each blog's likes to the accumulated likes array
  const blogLikesArray=new Array(uniqueauthors.length).fill(0)
  
  for(i=0;i<uniqueauthors.length;i++){
      blogs.forEach(blog => {

        if(blog.author===uniqueauthors[i]){
          blogLikesArray[i]=blogLikesArray[i]+blog.likes
        }
        
      });
    }

    console.log("accumulated likes array:", blogLikesArray)

    const maxLikesNumber=Math.max(...blogLikesArray)
      console.log("max likes number:", maxLikesNumber)

      const index=_.indexOf(blogLikesArray,maxLikesNumber)
      const authorToFind=uniqueauthors[index]

      const authorObject={
        author:authorToFind,
        likes:maxLikesNumber
      }
    
      return authorObject

}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }