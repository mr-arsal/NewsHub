import React , {useEffect , useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const NewsComponent = (props)=> {
  
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  // document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsHub`


  
  const updateNews = async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=34f30253c76949c1b63cacb1133c46fa&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100)

  }

  useEffect(() => {
    updateNews();
  }, [])
  

  const handleForNext = async () => {
    // if (this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)) {
    //   // console.log('Not responding')
    // }
    // else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=34f30253c76949c1b63cacb1133c46fa&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //   this.setState({loading: true})
    //   let data = await fetch(url)
    //   let parsedData = await data.json()
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   })
    // }
    await setPage(page + 1)
    updateNews()

  }

  const handleForPrev = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=34f30253c76949c1b63cacb1133c46fa&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url)
    // let parsedData = await data.json()

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // })

    await setPage(page - 1)
    updateNews()
  }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=34f30253c76949c1b63cacb1133c46fa&page=${page + 1}&pageSize=${props.pageSize}`
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    totalResults(parsedData.totalResults);
  };


  
    return (
      <>

        <h1 className="text-center " style={{margin : "90px 0 45px", }}>{props.category.charAt(0).toUpperCase() + props.category.slice(1)} - Top News</h1>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
          
        >
          <div className="container">
            <div className='row '>
              {articles.map((element , index) => {
                return <div className='col-md-4 ' key={index}>
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-lg btn-dark my-5" onClick={this.handleForPrev}> &larr; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} className="btn btn-lg btn-dark my-5" onClick={this.handleForNext}>Next &rarr;</button>

        </div> */}
      </>


    )
  
}

NewsComponent.defaultProps = {
  country: 'us',
  pageSize: 12,
  category: 'general'
}

NewsComponent.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default NewsComponent