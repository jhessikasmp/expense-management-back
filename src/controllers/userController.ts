import { Request, Response } from "express";
import User from "../models/User";

// Criar novo usuário
export async function createUser(req: Request, res: Response) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar usuário", details: err });
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
