import { Router } from 'express';
import {
  subirImagen,
  verImagenes,
  verImagen,
  eliminarImagen,
  actualizarImagen,
} from '../controllers/imagen.controller';
import multer from '../libs/multer';
const router = Router();

router
  .route('/imagen')
  .post(multer.single('image'), subirImagen)
  .get(verImagenes);

router
  .route('/imagen/:id')
  .get(verImagen)
  .delete(eliminarImagen)
  .put(actualizarImagen);

export default router;
