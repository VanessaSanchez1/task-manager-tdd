const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Crear una nueva tarea
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await Task.create({ title, description });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
});

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
});

// Actualizar una tarea
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

    task.title = title;
    task.description = description;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
});

// Eliminar una tarea
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

    await task.destroy();
    res.sendStatus(204); // No Content
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
});

// Marcar una tarea como completada
router.patch('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

    task.completed = true;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al completar la tarea' });
  }
});

module.exports = router;