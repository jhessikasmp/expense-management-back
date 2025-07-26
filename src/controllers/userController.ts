import { Request, Response } from "express";
import User from "../models/User";

// Criar novo usuário
export async function createUser(req: Request, res: Response) {
  try {
    console.log('Dados recebidos:', req.body);
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    console.error('Erro ao criar usuário:', err);
    
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || 'campo';
      res.status(400).json({ error: `Já existe um usuário com este ${field}` });
    } else {
      res.status(400).json({ error: err.message || "Erro ao criar usuário" });
    }
  }
}

// Listar usuários
export async function listUsers(req: Request, res: Response) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
}

// Atualizar usuário
export async function updateUser(req: Request, res: Response) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Erro ao atualizar usuário", details: err });
  }
}
