console.log('---------------------------------------------');
console.log('controllers index.js');
console.log('---------------------------------------------');

const{ v4: uuidv4 } = require('uuid');
const{ User, Domain, sequelize } = require('../models');
//const{ QueryTypes } = require('sequelize');

// /*
exports.renderLogin = async(req, res, next)=>{
    try{
        console.log('---------------------------------------------');
        console.log('controllers index.js --- renderLogin');
        console.log('---------------------------------------------');
        
        const user = await User.findOne({
            where: {id: req.user?.id|| null},
            include: {model: Domain},
        });

        res.render('login', {
            user,
            domains: user?.Domains,
        });

    }catch(err){
        console.error(err);
        next(err);
    }
};

// /domain/*
exports.createDomain = async(req, res, next)=>{
    try{
        console.log('---------------------------------------------');
        console.log('controllers index.js --- createDomain');
        console.log(`UserId : ${req.user.id}, login.html form host: ${req.body.host}`);
        console.log(`login.html form type : ${req.user.type}, uuidv4: ${uuidv4}`);
        console.log('---------------------------------------------');

        await Domain.create({
            UserId: req.user.id,
            host: req.body.host,
            type: req.body.type,
            clientSecret: uuidv4(),
        });

        res.redirect('/');

    }catch(err){
        console.error(err);
        next(err);
    }
};

