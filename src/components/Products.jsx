import React, {useEffect, useState} from "react";
import {deleteProduct, getAllProducts, getPhoto} from "../api/ProductApi";
import {Grid} from "@material-ui/core";
import {Button, Typography} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import dummy from "../dummy.jpg"
import {useProductsStyles} from "../styles/productsStyles";
import SearchField from "./SearchField";

const Products = props  => {
  const history = props.history
  const classes = useProductsStyles()
  const [allProducts, setAllProducts] = useState(history.state ? history.state : [])
  useEffect(() => {
    loadAllProducts(setAllProducts, fillAllProducts)
  },[])

  const toChange = (event) => {
    let productId = event.currentTarget.parentNode.id
    history.push(`/changeProduct/${productId}`)
  }
  const toDelete = (event) => {
    let productId = event.currentTarget.parentNode.id
    removeProduct(setAllProducts, productId, allProducts)
  }

  return(
    <div>
      <SearchField history={history} setAllProducts={setAllProducts} fillAllProducts={fillAllProducts} loadAllProducts={loadAllProducts}/>
      <Grid container className={classes.mainGrid}>
        {allProducts.map(product => {
          return(
            <Card className={classes.card} key={product.id}>
              <CardContent id = {product.id}>
                <div>
                  <img width="149" alt="complex" src={product.photo ? product.photo : dummy}/>
                </div>
                <Typography>Название: {product.name}</Typography>
                <Typography>Каллории: {product.calories}</Typography>
                <Button onClick={toChange} variant="contained" color="primary">
                  Изменить
                </Button>
                <Button onClick={toDelete} variant="contained" color="secondary">
                  Удалить
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </Grid>
    </div>
  )
}

const loadAllProducts = (setAllProducts, fillAllProducts) => {
  getAllProducts()
    .then(response => fillAllProducts(response, setAllProducts)
      )
    .catch(error => alert(error))
}

const fillAllProducts = (response, setAllProducts) => {
  response.forEach(productResponseObject => {
    let product = {}
    if (productResponseObject.imagePath === null) {
      product["id"] = productResponseObject.id
      product["name"] = productResponseObject.name
      product["calories"] = productResponseObject.calories
      product["photo"] = null
      setAllProducts(prevState => [...prevState, product])
    } else {
      getPhoto(productResponseObject.imagePath)
        .then(img => {
          product["id"] = productResponseObject.id
          product["name"] = productResponseObject.name
          product["calories"] = productResponseObject.calories
          product["photo"] = img
          setAllProducts(prevState => [...prevState, product])
        })
    }
  })
}

const removeProduct = (setAllProducts, id, allProducts) => {
  deleteProduct(id)
    .then(response => {
      setAllProducts(prevState => prevState.filter(el => el.id != id))
    })
    .catch(error =>  alert(error))
}


export default Products