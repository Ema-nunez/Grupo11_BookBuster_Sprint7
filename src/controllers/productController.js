let db = require('../database/models');
const { Op } = require("sequelize");
const imageController = require('../controllers/imageController')
const { validationResult } = require("express-validator");
const productController = {
    cart : (req,res)=>{
        res.render('products/cart');
    },

    detail : (req,res)=>{

        let productId = req.params.id;
        db.Product.findByPk(productId,{
            include : ['images','category','state','detail','size']
        })
        .then(product => {
            
           return res.render('products/productDetail',{product})
        })
    },

    search : (req,res)=>{
        let search = req.query.searchbar;
        
        db.Product.findAll({
            where: {
                name: { [Op.like] : '%' + search + '%' }
            },
            include : ['images' ]
        }).then(products => {
            res.render('products/index',{products})
        })

    },

    create : (req,res)=>{
        let promEditorials = db.Editorial.findAll();
        let promCategories = db.Category.findAll();
        let promDetails = db.Detail.findAll();
        let promSizes = db.Size.findAll();
        let promStates = db.State.findAll();

        Promise
        .all([promCategories, promEditorials, promDetails, promSizes, promStates ])
        .then(([allCategories, allEditorials, allDetails, allSizes, allStates])=>{
            
            // res.json(allCategories)
            res.render('products/agregarProducto',{allCategories,allEditorials,allDetails,allSizes,allStates});
        })
        
    },

    store:(req,res)=>{
        db.Product.create({
            
            name:req.body.nombre,
            price:req.body.precio,
            description:req.body.descripcion,
            stock_min : req.body.stockMin,
            stock_max : req.body.stockMax,
            states_id:req.body.estado,
            categories_id:req.body.categoria,
            sizes_id : req.body.formato,
            details_id : req.body.detail,
            editorials_id : req.body.editorial,

        })
        .then((aux)=>{
            let image = req.file.filename
            
            imageController.create(aux.id,image)
            console.log('cree un nuevo producto')
            res.redirect('/')
        })
        
    },
    
    edit : (req,res)=>{

        let productId = req.params.id;
        let promProducts = db.Product.findByPk(productId,{
            include : ['category','state','detail','editorial','size','images']
        }) 

        let promEditorials = db.Editorial.findAll();
        let promCategories = db.Category.findAll();
        let promDetails = db.Detail.findAll();
        let promSizes = db.Size.findAll();
        let promStates = db.State.findAll();

        Promise.all([promProducts,promCategories, promEditorials, promDetails, promSizes, promStates])
        .then(([product,allCategories, allEditorials, allDetails, allSizes, allStates])=>{
            return res.render('products/editarProducto',{product,allCategories, allEditorials, allDetails, allSizes, allStates})
        })
    },

    update: async(req,res)=>{

//         const resultValidation = validationResult(req);
// //hacemos peticion de todos los datos de cada tabla relacionada al producto
//         let product = await db.Product.findByPk(req.params.id);
//         let allEditorials = await db.Editorial.findAll();
//         let allCategories = await db.Category.findAll();
//         let allDetails = await db.Detail.findAll();
//         let allSizes = await db.Size.findAll();
//         let allStates = await db.State.findAll();
        
// //si se detecta algun error tras haberse validado rendereizamos de nuevo la vista y le pasaremos todos los datos
//         if (resultValidation.errors.length > 0) {
//             return res.render("./products/editarProducto", {
//                 product,
//                 allEditorials,
//                 allCategories,
//                 allDetails,
//                 allSizes,
//                 allStates,
//                 productID : req.params.id,
//                 errors: resultValidation.mapped(),
//                 oldData: req.body,
//             });
//         }

        try { 

            let productId = req.params.id;
            let image = db.Image.findOne({
                where : {
                        products_id : productId
                }
            }).then(()=>{

                if(req.file == undefined){
                    imageController.edit(productId,image.name)
                }else{
                    imageController.edit(productId,req.file.filename)
                }

                db.Product.update({
                    name: req.body.nombre,
                    price: req.body.precio,            
                    description: req.body.descripcion,
                    stock_min : req.body.stockMin,
                    stock_max : req.body.stockMax,
                    states_id: req.body.estado,
                    categories_id: req.body.categoria,
                    sizes_id : req.body.formato,
                    details_id : req.body.detail,
                    editorials_id : req.body.editorial,
                },{
                    where : {
                        id : productId
                    }
                }).then(()=>{
                    return res.redirect(`/products/detailProduct/${req.params.id}`)
                })
            })

        }catch(error){
            res.send(error)
        }

        
        
 
    },

    eliminar: function(req,res){

        let productId = req.params.id;

        db.Product.findByPk(productId,{
            include : ['images']
        }).then(()=>{
            db.Image.destroy({
                where : {
                    products_id : productId
                }
            }).then(()=>{
                db.Product.destroy({
                    where : {
                        id : productId
                    }
                })
                .then(()=>{
                    return res.redirect('/')
                })
            })
        })
    }
}

module.exports = productController;