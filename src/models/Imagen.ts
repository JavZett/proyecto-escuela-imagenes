import { Schema, model, Document } from 'mongoose';
import moment from 'moment';

const schemaImagen = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario'],
  },
  fechaSubida: {
    type: String,
    default: moment().format('LL'),
    required: false,
  },
  imagePath: String,
});

export interface IImagen extends Document {
  nombre: string;
  fechaSubida: string;
  imagePath: string;
}

export default model('Imagen', schemaImagen);
