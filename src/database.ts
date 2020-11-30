import { connect } from 'mongoose';

export async function conexion() {
  try {
    await connect(
      'mongodb+srv://zetta:olaolaola315@cluster0.cek1n.mongodb.net/proyectoEscuelaFotos?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log('Conexion Exitosa');
  } catch (error) {
    console.log(error);
  }
}
