require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res,next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send('Access denied');
  
    const token = authHeader.replace('Bearer ', '');
    if (!token) return res.status(401).send('Access denied');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        res.send(400).send('Invalid token.');
    }

};

module.exports = authMiddleware;