import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs-extra';
import Imagen from '../models/Imagen';
import { IImagen } from '../models/Imagen';

const errorJSON = {
  ok: false,
  message: 'Algo ha salido mal :(',
  error: '',
};

export async function verImagenes(req: Request, res: Response) {
  try {
    const imagenes = await Imagen.find();
    return res.json({
      ok: true,
      imagenes,
    });
  } catch (err) {
    errorJSON.error = err;
    return res.status(400).json(errorJSON);
  }
}

export async function verImagen(req: Request, res: Response) {
  try {
    const imagen = await Imagen.findById(req.params.id);
    return res.json({
      ok: true,
      imagen,
    });
  } catch (err) {
    errorJSON.error = err;
    return res.status(400).json(errorJSON);
  }
}

export async function subirImagen(req: Request, res: Response) {
  try {
    const { nombre } = req.body;
    const newImagen = {
      nombre,
      imagePath: req.file.path,
    };

    const imagen = new Imagen(newImagen);
    const imagenGuardada = await imagen.save();

    return res.json({
      ok: true,
      info: imagenGuardada,
      message: 'Imagen subida correctamente',
    });
  } catch (err) {
    errorJSON.error = err;
    return res.status(400).json(errorJSON);
  }
}

export async function eliminarImagen(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const imagenBorrada = (await Imagen.findByIdAndRemove(id)) as IImagen;
    if (imagenBorrada) {
      await fs.unlink(path.resolve(imagenBorrada.imagePath));
    }
    if (!imagenBorrada) {
      res.status(400).json({
        ok: false,
        message: 'Imagen no encontrada',
      });
    }
    return res.json({
      ok: true,
      message: 'La imagen fúe eliminada correctamente',
      imagenBorrada,
    });
  } catch (err) {
    errorJSON.error = err;
    return res.status(400).json(errorJSON);
  }
}

export async function actualizarImagen(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const imagenActualizada = await Imagen.findByIdAndUpdate(
      id,
      { nombre },
      { new: true }
    );

    return res.json({
      ok: true,
      message: 'Imagen actualizada correctamente',
      imagenActualizada,
    });
  } catch (err) {
    errorJSON.error = err;
    return res.status(400).json(errorJSON);
  }
}
