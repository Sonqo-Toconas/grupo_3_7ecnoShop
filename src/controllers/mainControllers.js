const controller = {
    index:(req,res)=>{
        return res.render('index');
    },
    carrito:(req,res)=>{
        return res.render('productCart');
    },
    producto:(req,res)=>{
        return res.render('productDetail');
    },
    login:(req,res)=>{
        return res.render('login');
    },
    registro:(req,res)=>{
        return res.render('register');
    }
}

module.exports = controller