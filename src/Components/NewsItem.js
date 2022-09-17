import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt, source } = this.props
    return (
      <div>
        <div className="card" >
          <img src={!imageUrl ? 'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} <span className="position-absolute  top-0 start-0  px-3 py-2 badge  text-bg-danger ">
              {source}
            </span></h5>
            <p className="card-text">{description}</p>
            <p className="card-text  fs-5"><small className="text-muted">By {!author ? 'Unknown' : author} on {new Date(publishedAt).toGMTString()}</small></p>
            <a rel="noreferrer" target="_blank" href={newsUrl} className="btn btn-md btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem