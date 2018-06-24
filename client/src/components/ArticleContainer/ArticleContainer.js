import React from "react";
import DeleteBtn from "../DeleteBtn";
import SaveBtn from "../SaveBtn";
import {List, ListItem} from "../List";

const ArticleContainer = ({articles, onClickBtn, saved}) => {
  return (
      <div className="card">
        <div className="card-header">
            {(saved) ? "Saved Articles" : "Search Results"}
        </div>
        <div className="card-body">
          {articles.length ? (
            <List>
              {articles.map(article => (
                <ListItem key={(saved) ? article._id : article.id}>
                  <div className="row">
                    <div className="col-sm-10">
                      <div className="row titleRow"> 
                        <a href={article.url} target="blank">
                          <strong>
                            {article.title}
                          </strong>
                        </a>
                      </div>
                      <div className="row authorRow"> 
                        {"~" + article.author.toLowerCase().replace("by","").trim()}
                      </div>
                    </div>
                    <div className="col-sm-2">
                      {
                        saved ? (<DeleteBtn onClick={() => onClickBtn(article._id)} />)
                        : (<SaveBtn onClick={() => onClickBtn(article.id)} />)
                      }        
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          ) 
          : (
            <h3>
              {(saved) ? "No Saved Articles to Display" : 
              "No Articles to show, use form above to search..."}
            </h3>
          )}
        </div>
      </div>
    );
};

export default ArticleContainer;
