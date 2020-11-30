import app from './app';
import { conexion } from './database';

async function main() {
  conexion();
  await app.listen(app.get('port'));
  console.log('Escuchando puerto: ', app.get('port'));
}

main();
