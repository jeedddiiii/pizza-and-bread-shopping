import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { PrimaryButton } from "./CommonStyled";
import { useSelector } from "react-redux";
import { productsEdit } from "../../slices/productsSlice";


export default function EditProduct({prodId}) {
  const [open, setOpen] = React.useState(false);
  
  const dispatch = useDispatch();
  const {items,editStatus} = useSelector((state) => state.products);
  

  const [currentProd, setCurrentProd] = useState({});
  const [previewImg, setPreviewImg] = useState("");


  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
        setPreviewImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      productsEdit({
        productImg,
        product:{
            ...currentProd,
            name:name,
            price:price,
            desc:desc,

        }
      })
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
    let selectedProd = items.filter((item) => item._id === prodId);
    selectedProd = selectedProd[0];

    setCurrentProd(selectedProd);
    setPreviewImg(selectedProd.image.url);
    setProductImg("");
    setName(selectedProd.name);
    setPrice(selectedProd.price);
    setDesc(selectedProd.desc);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Edit onClick={handleClickOpen}>Edit</Edit>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <StyledEditProduct>
            <StyledForm onSubmit={handleSubmit}>
              <h3>Create a Product</h3>
              <input
                type="file"
                accept="image/"
                onChange={handleProductImageUpload}
                
              />
              <input
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="Short Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <PrimaryButton type="submit">
                {editStatus === "pending"? "Submitting...":"Submit"}
              </PrimaryButton>
            </StyledForm>
            <ImagePreview>
              {previewImg ? (
                <>
                  <img src={previewImg} alt="product image!" />
                </>
              ) : (
                <p>Image Preview</p>
              )}
            </ImagePreview>
          </StyledEditProduct>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}
const Edit = styled.button`
  border: none;
  outline: none;
  padding: 3px 5px;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`;
const StyledEditProduct = styled.div`
  display: flex;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin-top: 2rem;
    select,input {
        padding: 7px;
        min-height: 30px;
        outline: none;
        border radius: 5px;
        border: 1px solid #ccc;
        margin: 0.3rem 0;
        &:focus {
            border: 1px solid #000;
        }
    }
    select {
        color: #000;
    }
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`;
