import React from "react";
import { Input, FormBtn } from "../Form";

const Search = ({topic, startYear, endYear, onInputChange, onSearch}) => {
    return (
        <div className="card">
            <div className="card-header">
                Search
            </div>
            <div className="card-body">
            <form>
                <Input
                    value={topic}
                    onChange={onInputChange}
                    name="topic"
                    placeholder="Topic (required)"
                />
                <Input
                    value={startYear}
                    onChange={onInputChange}
                    name="startYear"
                    placeholder="Start Year (YYYY)"
                />
                <Input
                    value={endYear}
                    onChange={onInputChange}
                    name="endYear"
                    placeholder="End Year (YYYY)"
                />
                <FormBtn
                    onClick={onSearch}
                >
                    Search for Articles
                </FormBtn>
            </form>
            </div>
        </div>
    )
}

export default Search;