const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6090b354242fab1770cd021c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa id mollitia animi praesentium incidunt ab optio ipsum numquam quas sequi.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
              },
            images:[
                {
                  url: 'https://res.cloudinary.com/notashark/image/upload/v1620609692/YelpCamp/sicmqv7rnh5pqudcyjvq.png',
                  filename: 'YelpCamp/sicmqv7rnh5pqudcyjvq'
                },
                {
                  url: 'https://res.cloudinary.com/notashark/image/upload/v1620609694/YelpCamp/khpqm1ogne2exal38quy.png',
                  filename: 'YelpCamp/khpqm1ogne2exal38quy'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})