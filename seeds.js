var mongoose = require('mongoose');
var Product = require('./models/product');
var Item = require('./models/item');
var Service = require('./models/service');
var User = require('./models/user');
var Testimonial = require('./models/testimonial');
var Photo = require('./models/photo');

var newUser = {
    username: process.env.ADMINUSER,
    password: process.env.ADMINPWD
};

var productData = [
    { 
        name: "Bidets",
        url: "bidets",
        image: "/images/products/bidets/bidets_main.jpg",
        description: "Bidets are good.<br>Our bidet products are shown here."
    },
    {
        name: "Lights",
        url: "lights",
        image: "/images/products/lights/lights_main.jpg",
        description: "Lights illuminate.<br>Our lights products are shown here."
    },
    { 
        name: "Fabrics",
        url: "fabrics",
        image: "/images/products/fabrics/fabrics_main.jpg",
        description: "We sell a wide selection of fabrics.<br>Our fabrics products are shown here."
    },
    { 
        name: "Others",
        url: "others",
        image: "/images/products/others/others_main.jpg",
        description: "We sell many more items.<br>Miscellaneous other products we sell are shown here."
    }
];

var bidetItemsData = [
    { name: "Direct Commode Attachment Bidet",
        url: "direct-commode-attachment-bidet",
        price: "USD $69.99 + shipping",
        image: "/images/products/bidets/direct_commode_bidet.png",
        // image: "https://i.imgur.com/KnlbaV8.png",
        description: "This product set consists of a solid brass sprayer, a solid brass regulator, hose and wall mount. It connects directly to your toilet commode, using our solid brass regulator/adaptor.  The fittings are all standard to all US toilets with water tanks. It can withstand 10-15 pounds per square inch (psi) water pressure.<br><br>(Model: FF/2012/dca.1)"
    },
    { name: "Fixed to the Wall Attachment Bidet",
        url: "fixed-to-the-wall-attachment-bidet",
        price: "USD $99.99 + shipping",
        image: "/images/products/bidets/fixed_wall_bidet.png",
        // image: "https://i.imgur.com/LNWIloE.png",
        description: "This is a stainless steel, chrome finish, wall mounted handheld bidet set.  Connect your hot and cold water line to our wall mounted bidet set from the water source going into your toilet.  It can withstand 10-15 pounds per square inch (psi) water pressure.<br><br>(Model: FF/2012/fwa.1)"
    },
    { name: "Elongated Sprayer Attachment Bidet",
        url: "elongated-sprayer-attachment-bidet",
        price: "USD $129.99 + shipping",
        image: "/images/products/bidets/elongated_sprayer_bidet.png",
        // image: "https://i.imgur.com/mF0IZWA.png",
        description: "This is a hot and cold attachment bidet set.  It's available in chrome finish.  It comes with a single control knob which regulates the water temperature and pressure.It can withstand 10-15 pounds per square inch (psi) water pressure.<br><br>(Model: FF/2012/esa.1)"
    },
    { name: "Toilet Sink Attachment Bidet",
        url: "toilet-sink-attachment-bidet",
        price: "USD $79.99 + shipping",
        image: "/images/products/bidets/toilet_sink_bidet.png",
        // image: "https://i.imgur.com/FG3j5O0.png",
        description: "This is a hot and cold attachment bidet set. It is easy to install.  It connects directly to your toilet sink faucet. It comes with a 1.5 meter flexible double lock hose. It can withstand 10-15 pounds per square inch (psi) water pressure.<br><br>(Model: FF/2012/tsa.1)"
    },
    { name: "Travel Portable Bidet",
        url: "travel-portable-bidet",
        price: "USD $15.00 (free shipping)",
        image: "/images/products/bidets/travel_bidet.png",
        // image: "https://i.imgur.com/zwbELiZ.png",
        description: "This is a 350ml extendable long nozzle spray travel portable .  It has an anti-flow air hole in the bottom of the portable bottle bidet. Very convenient when traveling. Discreet in size, easy to put in purses.  It comes with a simple kit.<br><br>(Model: FF/2012/ptb.1)"
    }
 ];

var lightsItemsData = [
    { name: "Toilet Bowl Night Light",
        url: "toilet-bowl-night-light",
        price: "USD $5 + shipping",
        image: "/images/products/lights/toilet_bowl_light.png",
        // image: "https://i.imgur.com/BRMNVc9.png",
        description: "This product is a motion activated cordless bathroom toilet night light. It transforms your toilet bowl into a night light with eight different colors rotating. It fits any toilet. It works best if the product sensor is placed facing the toilet door. The product operates with three AAA batteries (not included).<br><br>Model: FF/2012/btnl.1"
    }
];

var fabricsItemsData = [];

var othersItemsData = [
     { name: "Customized Hand-Held Fan",
        url: "customized-hand-held-fan",
        price: "USD $10.00 (free shipping)",
        image: "/images/products/others/customized_fan.png",
        // image: "https://i.imgur.com/nSCukii.png",
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
    { image: "https://i.imgur.com/slzHzwo.jpg",
        caption: ""
    },
    { image: "https://i.imgur.com/QGIfrRw.jpg",
        caption: ""
    },
    { image: "https://i.imgur.com/0Qw408j.jpg",
        caption: ""
    },
    { image: "https://i.imgur.com/mxoqQey.jpg",
        caption: ""
    },
    { image: "https://i.imgur.com/OQUr34l.jpg",
        caption: ""
    },
    { image: "https://i.imgur.com/6VRSBOP.jpg",
        caption: ""
    },
    { image: "https://i.imgur.com/ja4aNMI.jpg",
        caption: ""
    },
    { image: "https://i.imgur.com/S4zNVaG.jpg",
        caption: ""
    },
    { image: "https://i.imgur.com/x7LjieP.jpg",
        caption: ""
    },
    { image: "https://i.imgur.com/sQH0eHI.jpg",
        caption: ""
    },
    { image: "https://i.imgur.com/SFb4F4q.jpg",
        caption: ""
    },
    { image: "https://i.imgur.com/TNv6APU.jpg",
        caption: ""
    },
    { image: "https://i.imgur.com/BQuxR5j.jpg",
        caption: ""
    },
    { image: "https://i.imgur.com/4wvsYNN.jpg",
        caption: ""
    },
    { image: "https://i.imgur.com/uI68Xya.jpg",
        caption: ""
    }
];

var servicesData = [
    { name: "Example Service",
        url: "example-service",
        price: "Starting at USD $60.00",
        image: "/images/products/white-sandy-beach.jpg",
        description: "This is an example of a service. This service does not exist yet."
    }
];

function populateItemsData(producturl) {
    switch(producturl) {
        case "bidets":
            return bidetItemsData;
        case "lights":
            return lightsItemsData;
        case "fabrics":
            return fabricsItemsData;
        case "others":
            return othersItemsData;
    }
}

function seedDB() {
    // remove and recreate all products
    Product.remove({}, function(err) {
        if (err) {
            console.log("[SEED] Could not remove products");
            console.log(err);
        } else {
            console.log("[SEED] All products removed.");
            // add new products
            productData.forEach(function(product) {
                Product.create(product, function(err, product) {
                    if (err) {
                        console.log(err); 
                    } else {
                        console.log("[SEED] product " + product.id + ": " + product.name + " added.");
                        // create new items
                        var itemsData = populateItemsData(product.url);
                        itemsData.forEach(function(item) {
                            Item.create(item, function(err, item) {
                                if (err) {
                                    console.log(err); 
                                } else {
                                    product.items.push(item);
                                    // only perform the save when all the items are added
                                    if (product.items.length === itemsData.length) {
                                        product.save( function(err) { console.log("New items added for product " + product.name + ": " + product.items.length )});
                                    }
                                    console.log("[SEED] Created new " + product.name + " item - " + item.name);
                                }
                            });
                        });
                    }
                }); 
            });
        } 
    });

    // remove all items
    Item.remove({}, function(err) {
        if (err) {
            console.log("[SEED] Something went wrong when deleting all items."); 
        } else {
            console.log("[SEED] All items removed.");  
        }
    });

    // remove and recreate all services
    Service.remove({}, function(err) {
        if (err) {
            console.log("[SEED] Something went wrong with deleting all services."); 
        } else {
            console.log("[SEED] All services removed.");
            // create new services
            // TO DO
            servicesData.forEach(function(t) {
                Service.create(t, function(err, service) {
                    if(err){
                        console.log(err); 
                    } else {
                        console.log("[SEED] Service " + service.name + " created."); 
                    }
                });
            });
        }
    });

    // remove and recreate all users
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


    // remove and recreate all testimonials
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

    // remove and recreate all photos
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
    });
};

module.exports = seedDB;
