import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import {useSearchFieldStyles} from "../styles/searchFieldStyles";
import {getProductsByName} from "../api/ProductApi";

const SearchField = ({history, setAllProducts, fillAllProducts, loadAllProducts}) => {
  const [searchingWord, setSearchingWord] = useState('')
  const classes = useSearchFieldStyles()
  const change = (event) => {
    setSearchingWord(event.target.value)
  }
  const search = () => {
    loadProductsByName(searchingWord, setAllProducts, fillAllProducts)
  }
  const searchAll = () => {
    setAllProducts([])
    loadAllProducts(setAllProducts, fillAllProducts)
  }
  const toAdding = () => {
    history.push("/addProduct")
  }

  return(
    <Grid item className={classes.mainInput}>
      <TextField
        id="name"
        label="Поиск продукта по названию"
        value={searchingWord}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={change}
      />
      <Button onClick={search} variant="contained" color="primary">
        Найти
      </Button>
      <Button onClick={searchAll} variant="contained" color="primary">
        Все продукты
      </Button>
      <Button onClick={toAdding} variant="contained" color="secondary">
        Добавить продукт
      </Button>


    </Grid>
  )
}

const loadProductsByName = (name, setAllProducts, fillAllProducts) =>
  getProductsByName(name)
    .then(response => {
      setAllProducts([])
      fillAllProducts(response, setAllProducts)
    })
    .catch(error => alert(error))


export default SearchField