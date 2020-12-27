import {makeStyles} from "@material-ui/core/styles";
import back2 from "../background2.jpg";


const productsStyles = () => ({
  mainGrid:{
    display: 'flex',
    justifyContent: 'center',
  },
  card:{
    margin: 25,
    width: 290,
    background:`url(${back2}) repeat`,
    cursor: 'pointer',
    color:'white'
  }
})

export const useProductsStyles = makeStyles(productsStyles, {name:  "Products"})