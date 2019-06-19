import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post.js';

axios.defaults.headers.common['Content-Type'] = 'application/json';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:9090/posts')
      .then(res => this.setState({posts: res.data}))
      .catch(e => console.log('Error'))
  }

  updatePost(id ,text) {
    axios
      .put(`http://localhost:9090/posts/${id}`, { text })
      .then(res => {
        const updatedPost = res.data;
        const updatedPosts = this.state.posts.map(post => {
          if (post.id === updatedPost.id) {
            return { post, ...updatedPost };
          } else {
            return post;
          }
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(e => console.log('Error'))
  }

  deletePost(id) {
    axios
      .delete(`http://localhost:9090/posts/${id}`)
      .then(response => {
        this.setState({
          posts: this.state.posts.filter(post => post.id !== id),
        });
      })
  }

  createPost(text) {
    axios
      .post('http://localhost:9090/posts', { text })
      .then(res => {          
         var joined = this.state.posts.concat(res.data)
         this.setState({ posts: joined });
      })
  }

  search(query){
    axios
      .get(`http://localhost:9090/posts?q=${query}`)
      .then(res => {
        this.setState({ posts: res.data });
      })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchFn={this.search}/>

        <section className="App__content">
          <Compose createPostFn={this.createPost}/>
          {posts.map(post => (
            <Post 
            key={post.id}
            text={post.text}
            date={post.date}
            id = {post.id}
            updatePostFn={this.updatePost}
            deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
