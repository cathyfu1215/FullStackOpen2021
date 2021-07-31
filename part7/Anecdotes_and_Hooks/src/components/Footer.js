const Footer = () => {

    const footerPadding={
        marginTop: '3em',
        backgroundColor:'lightgrey'
        
      }

      return(
    <div style={footerPadding}>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.
  
      See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
  )
      }

  export default Footer