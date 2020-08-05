import axios from "axios";

export default {
    searchJob: function(query) {
        return axios.get("https://jobs.github.com/positions.json?page=1&search=" + query)
    }
}