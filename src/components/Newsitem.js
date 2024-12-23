import React  from 'react'

const  Newsitem =(props)=> {

  
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className='my-3'>
        <div className="card" >
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:0}}>
          <span className='badge rounded-pill bg-danger'>{source}</span>
          </div>
          <img src={!imageUrl ? "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className='card-text'><small className='text-muted'>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default Newsitem
