import React, { Component } from "react";
import Search from "../Search";
import Nav from "../Nav";
import DeleteBtn from "../DeleteBtn";
import {List, ListItem} from "../List";
import API from "../../utils/API";

class AppContainer extends Component {
  state = {
    articles: [],
    savedArticles: [],
    topic: "",
    startYear: "",
    endYear: ""
  };
  deleteArticle = id => {};

  onInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSearch = e => {
    e.preventDefault();
    API.search(this.state)
    .then(res =>{
      let array = res.data.response.docs.slice(0,10).map(article => {
        return {
          url: article.web_url,
          date: article.date,
          title: article.headline.main,
          author: article.byline.original,
          _id: article._id
        }
      });
      this.setState({articles:array});
    })
    .catch(err => console.log(err));
  };

  render() {
    return (
        <div>
          <Nav />
          <Search topic = {this.state.topic}
            startYear = {this.state.startYear}
            endYear = {this.state.endYear}
            onInputChange = {this.onInputChange}
            onSearch = {this.onSearch}/>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.url} target="blank">
                      <strong>
                        {article.title} by {article.author}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Articles to Display</h3>
            )}
            {this.state.savedArticles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.url}>
                      <strong>
                        {article.title} by {article.author}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Saved Articles to Display</h3>
            )}
        </div>
    );
  }
}

export default AppContainer;
