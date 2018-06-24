import React, { Component } from "react";
import Search from "../Search";
import Nav from "../Nav";
import ArticleContainer from "../ArticleContainer";
import {Container} from "../Grid";
import API from "../../utils/API";

class AppContainer extends Component {
  state = {
    articles: [],
    savedArticles: [],
    topic: "",
    startYear: "",
    endYear: ""
  };

  componentDidMount = () => {
    this.getSavedArticles();
  };

  deleteArticle = id => {
    API.deleteArticle(id)
    .then(() => {
      this.getSavedArticles();
      this.onSearch();
    })
    .catch(err => console.log(err));
  };

  getSavedArticles = () => {
    API.getArticles()
    .then(res=>{
      this.setState({savedArticles: res.data});
    })
    .catch(err => console.log(err));
  };

  saveArticle = id => {
    API.saveArticle(this.state.articles.filter(article => article.id === id)[0])
    .then(res => {
      this.setState({
        articles: this.state.articles.filter(article => article.id !== id),
        savedArticles: [...this.state.savedArticles, res.data]
      })
    })
    .catch(err => console.log(err));
  };

  onInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSearch = e => {
    if (e) e.preventDefault();
    API.search(this.state)
    .then(res =>{
      let articles = res.data.response.docs.map(article => {        
        return {
            url: article.web_url,
            pubDate: article.pub_date,
            title: article.headline.main,
            author: (article.byline)? article.byline.original : "",
            id: article._id
          }
      }).filter(filterArticle => this.state.savedArticles.filter(a => a.title === filterArticle.title).length === 0);
      this.setState({articles});
    })
    .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Nav />
        <Container>
          <Search topic = {this.state.topic}
            startYear = {this.state.startYear}
            endYear = {this.state.endYear}
            onInputChange = {this.onInputChange}
            onSearch = {this.onSearch}/>
          <ArticleContainer articles = {this.state.articles}
            onClickBtn = {this.saveArticle} saved = {false}/>
          <ArticleContainer articles = {this.state.savedArticles}
            onClickBtn = {this.deleteArticle} saved = {true}/>
        </Container>
      </div>
    );
  }
}

export default AppContainer;
