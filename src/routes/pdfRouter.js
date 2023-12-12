const express = require('express');
const router = express.Router();
const PDFDocument = require("pdfkit-table"); 
const db = require('../database/models');
const middleware = require('../middlewares/authMiddleware')

router.get('/:id', middleware, async (req,res) => {
    
    let query = req.params.id;

    const matches = query.match(/id\d+/g);
    const ids = matches.map(match => match.replace('id', ''));
    
    let invoiceFields = []
    let solds = []
    for (const invoiceId of ids) {
        let invoice = await db.Invoice.findOne({
            where: { 'id_invoice': invoiceId },
            include: [
                { model: db.Product, as: 'producto' },
                { model: db.User, as: 'usuario' }
            ]
        })
            let sold = await db.Sold.findOne({
                where:{
                    user_id : invoice.id_user,
                    product_id : invoice.id_product
                },
                order: [['id_sold', 'DESC']]
            })
            solds.push(sold);
        invoiceFields.push(invoice);
    }


    const doc = new PDFDocument();

    doc.text('Compra Realizada');
    for (let i = 0; i < invoiceFields.length; i++) {
        let {usuario, producto} = invoiceFields[i]
        let tableArray = {
            title: "Compra En 7ecnoShop",
            subtitle: "comprobante",
            headers:['Usuario','Numero de Telefono','Producto','Cantidad','Medio De Pago', 'Precio', 'Fecha De Compra', 'Total'],
            rows:[
                [usuario.name, usuario.phone, producto.name, solds[i] && solds[i].amount ? solds[i].amount : '1', invoiceFields[i].method_pay, producto.price, invoiceFields[i].invoice_date, producto.price * (solds[i] && solds[i].amount ? solds[i].amount : 1)],
            ]
        }
    
        await doc.table(tableArray,{ width: 500})
        
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="comprobante.pdf"');

    doc.pipe(res);
    doc.end();
})

module.exports = router