const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        // Mapeamos los datos para que coincidan con lo que espera el frontend
        // El frontend espera: title (no name), pero guardamos name.
        const formattedProducts = products.map(product => ({
            _id: product._id,
            title: product.name, // El front usa 'title', la BD usa 'name'
            stock: product.stock,
            size: product.size,
            price: product.price,
            color: product.color,
            img: product.img,
            description: product.description,
            category: product.category
        }));
        res.json(formattedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/products', upload.single('img'), async (req, res) => {
    try {
        // multer stores file and puts filename on req.file
        const imgPath = req.file ? `/public/${req.file.filename}` : null;

        const product = new Product({
            name: req.body.name,
            stock: req.body.stock,
            size: req.body.size,
            price: req.body.price,
            color: req.body.color,
            img: imgPath,
            description: req.body.description,
            category: req.body.category
        });

        const newProduct = await product.save();

        // Return formatted product similar to GET mapping
        const formatted = {
            _id: newProduct._id,
            title: newProduct.name,
            stock: newProduct.stock,
            size: newProduct.size,
            price: newProduct.price,
            color: newProduct.color,
            img: newProduct.img,
            description: newProduct.description,
            category: newProduct.category
        };

        res.status(201).json(formatted);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update product by id (supports replacing image)
router.put('/products/:id', upload.single('img'), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        // If a new image is uploaded, remove the old one
        if (req.file && product.img) {
            try {
                const oldFile = path.join(__dirname, '..', path.basename(product.img));
                if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
            } catch (err) {
                console.warn('No se pudo borrar imagen anterior:', err.message);
            }
        }

        const imgPath = req.file ? `/public/${req.file.filename}` : product.img;

        // Update fields (map front 'title' to 'name')
        product.name = req.body.name ?? product.name;
        product.price = req.body.price ?? product.price;
        product.size = req.body.size ?? product.size;
        product.color = req.body.color ?? product.color;
        product.category = req.body.category ?? product.category;
        product.stock = req.body.stock ?? product.stock;
        product.description = req.body.description ?? product.description;
        product.img = imgPath;

        const updated = await product.save();

        const formatted = {
            _id: updated._id,
            title: updated.name,
            stock: updated.stock,
            size: updated.size,
            price: updated.price,
            color: updated.color,
            img: updated.img,
            description: updated.description,
            category: updated.category
        };

        res.json(formatted);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete product by id and its image
router.delete('/products/:id', async (req, res) => {
    try {
        const toDelete = await Product.findById(req.params.id);
        if (!toDelete) return res.status(404).json({ message: 'Producto no encontrado' });

        // Remove image file if exists
        if (toDelete.img) {
            try {
                const filePath = path.join(__dirname, '..', path.basename(toDelete.img));
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            } catch (err) {
                console.warn('No se pudo borrar imagen asociada:', err.message);
            }
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;