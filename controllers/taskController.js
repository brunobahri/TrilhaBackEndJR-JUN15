const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log('Creating task for user ID:', req.user.id); // Adicionando log
    const task = await Task.create({
      title,
      description,
      userId: req.user.id // Obtendo o ID do usuário autenticado
    });
    res.status(201).json({ message: 'Tarefa criada com sucesso', task });
  } catch (error) {
    console.log('Erro ao criar tarefa:', error.message);
    res.status(500).json({ message: 'Erro ao criar tarefa', error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    console.log('Fetching tasks for user ID:', req.user.id); // Adicionando log
    const tasks = await Task.findAll({
      where: { userId: req.user.id } // Obtendo as tarefas do usuário autenticado
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.log('Erro ao obter tarefas:', error.message);
    res.status(500).json({ message: 'Erro ao obter tarefas', error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    console.log('Updating task for user ID:', req.user.id, 'Task ID:', id); // Adicionando log
    const task = await Task.findOne({
      where: { id, userId: req.user.id }
    });

    if (!task) {
      console.log('Tarefa não encontrada para user ID:', req.user.id, 'Task ID:', id);
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.status(200).json({ message: 'Tarefa atualizada com sucesso', task });
  } catch (error) {
    console.log('Erro ao atualizar tarefa:', error.message);
    res.status(500).json({ message: 'Erro ao atualizar tarefa', error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting task for user ID:', req.user.id, 'Task ID:', id); // Adicionando log
    const task = await Task.findOne({
      where: { id, userId: req.user.id }
    });

    if (!task) {
      console.log('Tarefa não encontrada para user ID:', req.user.id, 'Task ID:', id);
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    console.log('Erro ao deletar tarefa:', error.message);
    res.status(500).json({ message: 'Erro ao deletar tarefa', error: error.message });
  }
};
