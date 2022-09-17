import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class NewsComponent extends Component {

  static defaultProps = {
    country: 'us',
    pageSize: 12,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }


  constructor(props) {
    super(props);
    // console.log('Constructor is running');
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
      loading: false,
    }
    document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsHub`
  }
  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=34f30253c76949c1b63cacb1133c46fa&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
    this.props.setProgress(100)

  }

  async componentDidMount() {
    this.updateNews()
  }

  handleForNext = async () => {
    // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
    //   // console.log('Not responding')
    // }
    // else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=34f30253c76949c1b63cacb1133c46fa&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading: true})
    //   let data = await fetch(url)
    //   let parsedData = await data.json()
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   })
    // }
    await this.setState({
      page: this.state.page + 1
    })
    this.updateNews()

  }

  handleForPrev = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=34f30253c76949c1b63cacb1133c46fa&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url)
    // let parsedData = await data.json()

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // })
    await this.setState({
      page: this.state.page - 1
    })
    this.updateNews()
  }

  fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=34f30253c76949c1b63cacb1133c46fa&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
      page: this.state.page + 1
    })
  };


  render() {
    // console.log('render')

    return (
      <>

        <h1 className="text-center my-5">{this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - Top News</h1>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          
        >
          <div className="container">
            <div className='row '>
              {this.state.articles.map((element) => {
                return <div className='col-md-4 ' key={element}>
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-lg btn-dark my-5" onClick={this.handleForPrev}> &larr; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-lg btn-dark my-5" onClick={this.handleForNext}>Next &rarr;</button>

        </div> */}
      </>


    )
  }
}

export default NewsComponent