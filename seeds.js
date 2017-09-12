var mongoose = require('mongoose');
var Product = require('./models/product');
var User = require('./models/user');
var Testimonial = require('./models/testimonial');
var Photo = require('./models/photo');

var newUser = {
    username: "fannyfriendly",
    password: "fanny2017"
};

var productData = [
    { name: "Direct Commode Attachment Bidet",
        price: "USD $69.99 + shipping",
        image: "/images/products/direct_commode_bidet.png",
        description: "This product set consists of a solid brass sprayer, a solid brass regulator, hose and wall mount. It connects directly to your toilet commode, using our solid brass regulator/adaptor.  The fittings are all standard to all US toilets with water tanks. It can withstand 10-15 pounds per square inch (psi) water pressure.<br><br>(Model: FF/2012/dca.1)"
    },
    { name: "Fixed to the Wall Attachment Bidet",
        price: "USD $99.99 + shipping",
        image: "/images/products/fixed_wall_bidet.png",
        description: "This is a stainless steel, chrome finish, wall mounted handheld bidet set.  Connect your hot and cold water line to our wall mounted bidet set from the water source going into your toilet.  It can withstand 10-15 pounds per square inch (psi) water pressure.<br><br>(Model: FF/2012/fwa.1)"
    },
    { name: "Elongated Sprayer Attachment Bidet",
        price: "USD $129.99 + shipping",
        image: "/images/products/elongated_sprayer_bidet.png",
        description: "This is a hot and cold attachment bidet set.  It's available in chrome finish.  It comes with a single control knob which regulates the water temperature and pressure.It can withstand 10-15 pounds per square inch (psi) water pressure.<br><br>(Model: FF/2012/esa.1)"
    },
    { name: "Toilet Sink Attachment Bidet",
        price: "USD $79.99 + shipping",
        image: "/images/products/toilet_sink_bidet.png",
        description: "This is a hot and cold attachment bidet set. It is easy to install.  It connects directly to your toilet sink faucet. It comes with a 1.5 meter flexible double lock hose. It can withstand 10-15 pounds per square inch (psi) water pressure.<br><br>(Model: FF/2012/tsa.1)"
    },
    { name: "Travel Portable Bidet",
        price: "USD $15.00 (free shipping)",
        image: "/images/products/travel_bidet.png",
        description: "This is a 350ml extendable long nozzle spray travel portable .  It has an anti-flow air hole in the bottom of the portable bottle bidet. Very convenient when traveling. Discreet in size, easy to put in purses.  It comes with a simple kit.<br><br>(Model: FF/2012/ptb.1)"
    },
    { name: "Customized Hand-Held Fan",
        price: "USD $10.00 (free shipping)",
        image: "/images/products/customized_fan.png",
        description: "This is a personalized flashing led handheld battery fan.  It's an air cooling fan.  It comes with 3pcs AAA battery.<br><br>(Model: FF/2012/chf.1)"
    }
];

var testimonialData = [
    { author: 'Jolene (Madison, WI)',
        text:
        'Hi Gail,<br>' + 
        '<p>My husband and I were at the Dane County Fair and bought your product.  I am emailing you about this for a couple of reasons.</p>' +
        '<p>I want to tell you how much we LOVE this product.  We can\'t imagine living without it.  I have heartily recommended it and have distributed the flyers you gave me.  We are so glad we came back to your booth and purchased this.</p>' + 
        '<p>Thank you for a fantastic product.</p>' +
        '<p>Play on,</p>'
    },
    { author: "Rick E. (Oconomowoc, WI)",
        text: 
        'Hi Gail,<br>' +
        '<p>I have tried using your hand-held bidet product and it\'s great, although it may take the Americans an adjustment period to get used to not using toilet paper.</p>' +
        '<p>I personally like the product. I hope it catches on fire.</p>' +
        '<p>Regards,</p>'
    },
    { author: "Serge (Boonton, NJ)",
        text: 
        'Hi bro!<br>' +
        '<p>I wrote a check for 3 sets and please mail them to my home.   It will be a great alternative for toilet paper.</p>' +
        '<p>I will need you to come visit me so you can install them for me.</p>' +
        '<p>God bless.</p>'
    },
    { author: "Ghazala",
        text: 
        'Hi Mama Bailey,<br>' +
        '<p>Please send me 2 sets to Virginia.  I will have Amir install them for me.</p>' +
        '<p>Love,</p>'
    }
];

var photoData = [
    { image: "/images/backgrounds/bathroom_2.jpg", 
        caption: "bathroom 2 oh bathroom 2"
    },
    { image: "/images/products/fixed_wall_bidet.png",
        caption: "something blah blah"
    },
    { image: "https://farm4.staticflickr.com/3923/14229526899_b098cfe101.jpg",
        caption: "nature"
    },
    { image: "https://farm1.staticflickr.com/46/120921750_d38cbc5477.jpg",
        caption: "mountains"
    },
    { image: "https://farm6.staticflickr.com/5592/15042544469_822cf0bc98.jpg",
        caption: "exloring"
    },
    { image: "https://farm3.staticflickr.com/2429/3918347491_b64f0d8aae.jpg",
        caption: "here we go again"
    }
];

function seedDB() {
    // remove all products
    Product.remove({}, function(err) {
        if (err) {
            console.log("[SEED] Could not remove products");
            console.log(err);
        } else {
            // add new products (seed data)
            productData.forEach(function(product) {
                Product.create(product, function(err, product) {
                    if (err) {
                        console.log(err); 
                    } else {
                        console.log("[SEED] product " + product.name + " added.");
                    }
                });
            });
        }
    });

    // remove all users
    User.remove({}, function(err) {
        if (err){
            console.log("[SEED] Something went wrong with deleting all Users."); 
        } else {
            console.log("[SEED] All users removed.");
            // create a new user.
            console.log("[SEED] username " + newUser.username);
            console.log("[SEED] password " + newUser.password);
            User.register(new User({username: newUser.username}), newUser.password, function(err, user) {
                if (err) {
                    console.log("[SEED] User could not be created");
                } else {
                    console.log("[SEED] User added"); 
                }
            });
        }
    });


    // remove all testimonials
    Testimonial.remove({}, function(err) {
        if(err){
            console.log("[SEED] Something went wrong with deleting all Testimonials."); 
        } else {
            console.log("[SEED] All testimonials removed.");
            // create new testimonials
            testimonialData.forEach(function(t) {
                Testimonial.create(t, function(err, t) {
                    if(err){
                        console.log(err); 
                    } else {
                        console.log("[SEED] Testimonial by " + t.author + " created."); 
                    }
                });
            });
        }
    });

    // remove all photos
    Photo.remove({}, function(err) {
        if(err){
            console.log(err);
            console.log("[SEED] Something went wrong with deleting all photos");
        } else {
            console.log("[SEED] All photos removed");
            // create new photos
            photoData.forEach(function(photo) {
                Photo.create(photo, function(err, photo) {
                    if(err) {
                        console.log(err); 
                    } else {
                        console.log("[SEED] Photo " + photo.image + " created"); 
                    }
                });
            });
        }

    })
};

module.exports = seedDB;
