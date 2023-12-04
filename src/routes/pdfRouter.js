const express = require('express');
const router = express.Router();
const PDFDocument = require("pdfkit-table"); 
const db = require('../database/models');

router.get('/:id', async (req,res) => {

    let id = req.params.id;
    let invoice = await db.Invoice.findOne({
        where:{'id_invoice':id},
            include: [
                { model: db.Product, as:'producto'},
                { model: db.User, as:'usuario'}
            ]
    },)


    const doc = new PDFDocument();

    doc.text('Compra Realizada');
    let {usuario, producto} = invoice
    let tableArray = {
        title: "Compra En 7ecnoShop",
        subtitle: "comprobante",
        headers:['Usuario','Numero de Telefono','Producto','Cantidad','Medio De Pago', 'Precio', 'Fecha De Compra', 'Total'],
        rows:[
            [usuario.name, usuario.phone, producto.name,'1', invoice.method_pay, producto.price, invoice.invoice_date, producto.price],
        ]
    }

    await doc.table(tableArray,{ width: 500})
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="comprobante.pdf"');

    doc.pipe(res);
    doc.end();
})

module.exports = router