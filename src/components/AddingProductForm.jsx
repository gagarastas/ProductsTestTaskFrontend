import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {Button, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useFormStyles} from "../styles/formStyles";
import {sendNewProduct} from "../api/ProductApi";

const AddingProductForm = (props) => {
  const history = props.history
  const classes = useFormStyles()

  const [name, setName] = useState('')
  const [calories, setCalories]= useState(0)
  const [image, setImage] = useState()

  const changeName = (event) => {
      setName(event.target.value);
  }
  const changeCalories = (event) => {
      setCalories(event.target.value)
  }
  const changeImage = (event) => {
    const allowedExtensions = ['png', 'jpg', 'jpeg'];

    const currentFileExt = event.target.files[0].name.split('.').pop();
    if (allowedExtensions.indexOf(currentFileExt) !== -1) {
      const newFile = event.target.files[0];
      setImage(newFile);
    } else {
      alert("файл " + event.target.files.name + " должен быть в формате png, jpg или jpeg")
    }
  }

  const send = () => {
    if(name.length < 1 || name.length > 30){
      alert("Название должно содержать от 1 до 30 символов")
    }
    else if(calories < 1){
      alert("каллории не могут быть меньше или равны нулю")
    }
    else {
      addProduct(name, calories, image, history)
    }
  }
  return(
    <form noValidate autoComplete="off">
      <Grid className={classes.mainGrid} container spacing={2} direction="column">
        <Grid item>
          <TextField
            className={classes.textInput}
            id="name"
            label="Название продукта"
            value={name}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={changeName}
          />
        </Grid>
        <Grid item>
          <TextField
            className={classes.textInput}
            id="calories"
            label="каллории"
            value={calories}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={changeCalories}
          />
        </Grid>
        <Grid item>
          <Typography>
            Выберите фотографию продукта
          </Typography>
          <input type="file" accept=".png, .jpg, .jpeg" id="file" multiple onChange={changeImage}/>
        </Grid>
        <Grid item>
          <Button onClick={send} variant="contained" color="primary">
            Добавить
          </Button>
        </Grid>
      </Grid>
    </form>

  )
}

const addProduct = (name, calories, image, history) => {
  sendNewProduct(name, calories, image)
    .then(info => history.push("/"))
    .catch(error => alert(error))

}

export default AddingProductForm