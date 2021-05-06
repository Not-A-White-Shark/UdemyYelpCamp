const User = require('../models/user');

const me = module.exports;

me.renderRegister = (req, res)=>{
    res.render('users/register');
}

me.register = async(req,res)=>{
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user,password);
        req.login(registeredUser, err=>{
            if(err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
        
        
    }catch(e){
        req.flash('error', e.message);
        res.redirect('register');
    }
}

me.renderLogin = (req,res)=>{
    res.render('users/login');
}

me.login = (req,res)=>{
    req.flash('success','welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

me.logout = (req,res)=>{
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
}