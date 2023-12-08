import { Router } from "express";
import { productsManager } from "../../../db/mainDB.js";


export const deleteProductRouter = Router();


deleteProductRouter.delete("/DeleteProduct/:id", async (req, res) => {
  try {
    let id = req.params.id
    console.log(id);
    await productsManager.deleteOne({_id:id})
    console.log("Se eliminó el producto");
    res.status(200).send("Producto eliminado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el producto");
  }
});
