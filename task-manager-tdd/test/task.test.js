const request = require('supertest');
const express = require('express');
const taskRoutes = require('../app/routes/taskRoutes');
const sequelize = require('../config/database');  // Importamos sequelize
const Task = require('../app/models/task');        // Importamos el modelo

const app = express();
app.use(express.json());
app.use('/tasks', taskRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true }); // recrea todo con el nuevo campo
});

describe('Task API', () => {
  it('debería crear una nueva tarea', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Aprender TDD', description: 'Practicar con Node.js y Jest' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Aprender TDD');
  });
});
it('Obtener todas las tareas', async () => {
    // Crear una tarea primero
    await Task.create({ title: 'Tarea 1', description: 'Crear tareas para validar - Construcción de Software 1' });
    await Task.create({ title: 'Tarea 2', description: 'Crear tareas para validar - Construcción de Software 2' });

    const res = await request(app).get('/tasks');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
    expect(res.body[0]).toHaveProperty('title');
  });

it('deberia actualizar una tarea existente', async () => {
    const tarea = await Task.create({ title: 'Tarea 1', description: 'Crear tareas para validar - Construcción de Software 1' });

    const res = await request(app)
      .put(`/tasks/${tarea.id}`)
      .send({ title: 'Nueva Tarea 1', description: 'Nueva descripción, Crear tareas para validar - Construcción de Software 1' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Nueva Tarea 1');
    expect(res.body.description).toBe('Nueva descripción, Crear tareas para validar - Construcción de Software 1');
  });

it('debería eliminar una tarea existente', async () => {
    const tarea = await Task.create({ title: 'Eliminar', description: 'Se va a eliminar' });

    const res = await request(app).delete(`/tasks/${tarea.id}`);

    expect(res.statusCode).toBe(204);

    const tareaEliminada = await Task.findByPk(tarea.id);
    expect(tareaEliminada).toBeNull();
  });

it('debería marcar una tarea como completada', async () => {
    const tarea = await Task.create({ title: 'Completar tarea', description: 'Debe marcarse', completed: false });

    const res = await request(app).patch(`/tasks/${tarea.id}/complete`);

    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });