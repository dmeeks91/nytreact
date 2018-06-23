import axios from "axios";
export default {
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },

  search: ({topic, startYear, endYear}) => {
    let queryString = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;    
    queryString += `?api-key=2d9e638d0b41450a932a20d88d570fd0&q="${topic}"`;
    queryString += `&begin_date=${startYear}0101&end_date=${endYear}1231`;

    //console.log("Running Query: " + queryString);

    return axios.get(queryString);
  }
};
