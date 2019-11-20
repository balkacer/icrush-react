import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import request from "superagent";
import debounce from "debounce";
import "./Posts.scss";

class Posts extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      posts: [],
    };

    // Binds our scroll event handler
    window.onscroll = debounce(() => {
      const {
        loadposts,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadposts();
      }
    }, 100);
  }

  componentWillMount() {
    // Loads some posts on initial load
    this.loadposts();
  }

  loadposts = () => {
    this.setState({ isLoading: true }, () => {
      request
        .get('https://randomuser.me/api/?results=10')
        .then((results) => {
          // Creates a massaged array of post data
          const nextPosts = results.body.results.map(post => ({
            email: post.email,
            name: Object.values(post.name).join(' '),
            photo: post.picture.medium,
            username: post.login.username,
            uuid: post.login.uuid,
          }));

          // Merges the next posts into our existing posts
          this.setState({
            // Note: Depending on the API you're using, this value may
            // be returned as part of the payload to indicate that there
            // is no additional data to be loaded
            hasMore: (this.state.posts.length < 100),
            isLoading: false,
            posts: [
              ...this.state.posts,
              ...nextPosts,
            ],
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
           });
        })
    });
  }

  render() {
    const {
      error,
      hasMore,
      isLoading,
      posts,
    } = this.state;

    const cantLikes = 12;

    return (
      <div className="PostContainer">

        {posts.map(post => (
          <Fragment key={post.username}>
            <hr/>
            <div className="Post">
              <div className="pHeader">
                <img className="iUser"
                  alt={post.username}
                  src={post.photo} />
                <h2 className="User">@{post.name}</h2>  
                <h2 className="User">@{post.username}</h2>                
              </div>
              <div className="postBody">
                <p>Lorem Ipsum es simplemente el texto de 
                  relleno de las imprentas y archivos de texto. 
                  Lorem Ipsum ha sido el texto de relleno 
                  estándar de las industrias desde el año 1500, 
                  cuando un impresor (N. del T. persona que se 
                  dedica a la imprenta) desconocido usó una 
                  galería de textos y los mezcló de tal manera 
                  que logró hacer un libro de textos especimen. 
                  No sólo sobrevivió 500 años, sino que tambien 
                  ingresó como texto de relleno en documentos 
                  electrónicos, quedando esencialmente igual al 
                  original. Fue popularizado en los 60s con la 
                  creación de las hojas "Letraset", las cuales 
                  contenian pasajes de Lorem Ipsum, y más 
                  recientemente con software de autoedición, 
                  como por ejemplo Aldus PageMaker, el cual 
                  incluye versiones de Lorem Ipsum.</p>
  `             <p>to @{post.username}</p>
              </div>
              <div className="footerPost">
                <div className="likes">
                  <span class="material-icons iFav">
                    favorite
                  </span>
                  <span class="cl">{cantLikes}</span>
                  <input type="text" className="inputComment" placeholder="Escribe un comentario..."></input>
                </div>
                <div className="comments">
                  {posts.map(post => (
                    <Fragment key={post.username}>
                      <div className="comment">
                        <span className="postNameComment">
                          @{post.username}
                        </span>
                        <p>For a complete list of ALL icons (font awesome, bootstrap and google), visit the Icon Reference.</p>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </Fragment>
        ))}
        <hr />
        {error &&
          <div style={{ 
            color: '#FFFFFF',
            background: '#E80D0C'
           }}>
            {error}
          </div>
        }
        {isLoading &&
          <div>Loading...</div>
        }
        {!hasMore &&
          <div style={{ 
            color: '#FFFFFF',
            background: '#2CFF00'
            }}>
            The END! No more posts!
          </div>
        }
      </div>
    );
  }
}

const container = document.createElement("div");
document.body.appendChild(container);
render(<Posts />, container);

export default Posts;