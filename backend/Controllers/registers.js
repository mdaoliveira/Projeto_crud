import { db } from "../db.js";

export const getRegister = (_, res) => {
    const q = "SELECT * FROM registros_aves";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json("Erro de servidor!");
        return res.status(200).json(data);
    });
}

export const postRegister = (req, res) => {
    const { especie, num_aves, usuario, localizacao, data_register } = req.body;
    if (!especie || !usuario || !localizacao || !data_register || typeof num_aves !== "number") {
        return res.status(400).json("Dados inválidos");
    }
    const q = "INSERT INTO registros_aves (especie, num_aves, usuario, localizacao, data_register) VALUES (?, ?, ?, ?, ?)";
    db.query(q, [especie, num_aves, usuario, localizacao, data_register], (err, result) => {
        if (err) return res.status(500).json("Erro no servidor");
        const newEspecie = { id: result.insertId, especie, num_aves, usuario, localizacao, data_register };
        return res.status(200).json(newEspecie);
    });
}

export const deleteRegister = (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) { return res.status(400).json("ID inválido"); }
    const q = "DELETE FROM registros_aves WHERE id = ?";
    db.query(q, [id], (err, data) => {
        if (err) return res.status(500).json("Erro de servidor!");
        return res.status(200).json(data);
    });
}

export const putRegister = (req, res) => {
    const id = req.params.id;
    const { especie, num_aves, usuario, localizacao, data_register } = req.body;
    if (isNaN(id) || !especie || !usuario || !localizacao || !data_register || typeof num_aves !== "number") {
        return res.status(400).json("Dados inválidos");
    }
    const q = "UPDATE registros_aves SET especie = ?, num_aves = ?, usuario = ?, localizacao = ?, data_register = ? WHERE id = ?";
    db.query(q, [especie, num_aves, usuario, localizacao, data_register, id], (err, data) => {
        if (err) return res.status(500).json("Erro de servidor!");
        return res.status(200).json(data);
    });
}
