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
        image: "/images/products/bidets/bidets_main.png",
        description: "Our Fanny bidet is committed to challenging the status quo of the constant usage of toilet paper."
    },
    {
        name: "Lights",
        url: "lights",
        image: "/images/products/lights/lights_main.png",
        description: "Convenience of use of our energy saving motion sensor lights improves your home."
    },
    { 
        name: "Fabrics",
        url: "fabrics",
        image: "/images/products/fabrics/fabrics_main.jpg",
        description: "Our fabrics are made of various strengths and degrees of durability."
    },
    { 
        name: "Novelty",
        url: "novelty",
        image: "/images/products/others/novelty_main.png",
        description: "Our novelty items are for keeps."
    }
];

var bidetItemsData = [
    { name: "Direct Commode Attachment Bidet",
        url: "direct-commode-attachment-bidet",
        price: "USD $69.99 + shipping",
        image: "https://i.imgur.com/bJT2Q3d.png",
        description: "This product set consists of a solid brass sprayer, a solid brass regulator, hose and wall mount. It connects directly to your toilet commode, using our solid brass regulator/adaptor.  The fittings are all standard to all US toilets with water tanks. It can withstand 10-15 pounds per square inch (psi) water pressure.<br><br>(Model: FF/2012/dca.1)"
    },
    { name: "Fixed to the Wall Attachment Bidet",
        url: "fixed-to-the-wall-attachment-bidet",
        price: "USD $99.99 + shipping",
        image: "https://i.imgur.com/TJGYKwi.png",
        description: "This is a stainless steel, chrome finish, wall mounted handheld bidet set.  Connect your hot and cold water line to our wall mounted bidet set from the water source going into your toilet.  It can withstand 10-15 pounds per square inch (psi) water pressure.<br><br>(Model: FF/2012/fwa.1)"
    },
    { name: "Elongated Sprayer Attachment Bidet",
        url: "elongated-sprayer-attachment-bidet",
        price: "USD $129.99 + shipping",
        image: "https://i.imgur.com/rqGzaeF.png",
        description: "This is a hot and cold attachment bidet set.  It's available in chrome finish.  It comes with a single control knob which regulates the water temperature and pressure.It can withstand 10-15 pounds per square inch (psi) water pressure.<br><br>(Model: FF/2012/esa.1)"
    },
    { name: "Toilet Sink Attachment Bidet",
        url: "toilet-sink-attachment-bidet",
        price: "USD $79.99 + shipping",
        image: "https://i.imgur.com/N4zB2i8.png",
        description: "This is a hot and cold attachment bidet set. It is easy to install.  It connects directly to your toilet sink faucet. It comes with a 1.5 meter flexible double lock hose. It can withstand 10-15 pounds per square inch (psi) water pressure.<br><br>(Model: FF/2012/tsa.1)"
    },
    { name: "Travel Portable Bidet",
        url: "travel-portable-bidet",
        price: "USD $15.00 (free shipping)",
        image: "https://i.imgur.com/DDSHHF2.png",
        description: "This is a 350ml extendable long nozzle spray travel portable .  It has an anti-flow air hole in the bottom of the portable bottle bidet. Very convenient when traveling. Discreet in size, easy to put in purses.  It comes with a simple kit.<br><br>(Model: FF/2012/ptb.1)"
    },
    { name: "Wudu Acrylic Appliance",
        url: "wudu-acrylic-appliance",
        price: "",
        image: "https://i.imgur.com/wxMrTcV.jpg",
        description: ""
    }
 ];

var lightsItemsData = [
    { name: "Toilet Bowl Night Light",
        url: "toilet-bowl-night-light",
        price: "USD $5 + shipping",
        image: "https://i.imgur.com/yMxcXhC.png",
        description: "This product is a motion activated cordless bathroom toilet night light. It transforms your toilet bowl into a night light with eight different colors rotating. It fits any toilet. It works best if the product sensor is placed facing the toilet door. The product operates with three AAA batteries (not included).<br><br>Model: FF/2012/btnl.1"
    },
    { name: "Faucet Led Light",
        url: "faucet-led-light",
        price: "",
        image: "https://i.imgur.com/tX2ic5G.jpg",
        description: "The device fits on most faucets and the led light, lights up when you turn on the tap. The lights are activated by water pressure."
    },
    { name: "Under The Bed Motion Sensor Night Light",
        url: "under-the-bed-night-light",
        price: "",
        image: "https://i.imgur.com/ILWmQ77.jpg",
        description: "It is a motion activated led night light hidden under the bed.  This is an awesome innovative product!"
    },
    { name: "Glowing Shoe Laces ",
        url: "glowing-shoe-laces-light",
        price: "",
        image: "https://i.imgur.com/EM4VXyn.jpg",
        description: "It glows in the dark shoe strings.  Very fashionable"
    },
    { name: "Portable Wireless Bluetooth Speaker",
        url: "portable-wireless-bluetooth-speaker",
        price: "",
        image: "https://i.imgur.com/omBxgJu.jpg",
        description: "This is a cool portable wireless bluetooth speaker.  Supports TF/AUX features."
    }
];

var fabricsItemsData = [
    { name: "Microfiber Sports Towel Fabric",
        url: "microfiber-sports-towel-fabric",
        price: "",
        image: "https://i.imgur.com/C7XumqU.jpg",
        description: "It is a plain dyed, eco-friendly, quick dry microfiber sports towel. It comes in different colors."
    }
];

var noveltyItemsData = [
     { name: "Customized Hand-Held Fan",
        url: "customized-hand-held-fan",
        price: "USD $10.00 (free shipping)",
        image: "https://i.imgur.com/JmxYQj2.png",
        description: "This is a personalized flashing led handheld battery fan.  It's an air cooling fan.  It comes with 3pcs AAA battery.<br><br>(Model: FF/2012/chf.1)"
    },
    { name: "Elastic Shoe Laces",
        url: "elastic-shoe-laces-novelty",
        price: "",
        image: "https://i.imgur.com/PS1n2L4.jpg",
        description: "Waterproof elastic shoe laces. It comes in different colors.  No more tying shoe laces!!!"
    },
    { name: "Plastic Hand Massager",
        url: "plastic-hand-massager-novelty",
        price: "",
        image: "https://i.imgur.com/ypDoeaJ.jpg",
        description: "This is a high quality, eco-friendly mini hand-held massager."
    },
    { name: "Hand Ball Massager",
        url: "hand-ball-massager-novelty",
        price: "",
        image: "https://i.imgur.com/eYIQDUV.jpg",
        description: "This is a hand ball massager.  It is great for deep muscle massage."
    },
    { name: "Portable Wireless Bluetooth Speaker",
        url: "bluetooth-speaker-novelty",
        price: "",
        image: "https://i.imgur.com/omBxgJu.jpg",
        description: "This is a portable, wireless bluetooth speaker. Different lights are displayed when music is played. Supports TF/AUX features."
    },
    { name: "Glowing Shoe Laces",
        url: "glowing-shoe-laces",
        price: "",
        image: "https://i.imgur.com/EM4VXyn.jpg",
        description: "It glows in the dark shoe strings.  Very fashionable."
    },
    { name: "Hygienic long reach comfort wipe (bottom buddy)",
        url: "hygienic-long-reach-comfort-wipe",
        price: "",
        image: "https://i.imgur.com/jjplQdQ.jpg"
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
        case "novelty":
            return noveltyItemsData;
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
