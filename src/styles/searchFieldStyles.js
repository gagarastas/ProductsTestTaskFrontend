import {makeStyles} from "@material-ui/core/styles";

const searchFieldStyles = () => ({
  mainInput:{
    marginTop: 80,
  },

})

export const useSearchFieldStyles = makeStyles(searchFieldStyles, {name:  "SearchField"})