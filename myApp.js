require('dotenv').config();
var mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(
  process.env['MONGO_URI'], 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//task 1 creating person schema

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favouriteFoods: [String] 
}); 

//person constructor
let Person = mongoose.model("Person", personSchema);


//let Person;

const createAndSavePerson = (done) => {
  var janeFonda = new Person({
      name: "Jane Fonda",
      age: 84,
      favouriteFoods: ["eggs", "fish", "fresh fruit"] 
  });
  
  janeFonda.save((err, result) => {
      if (err) return console.error(err);
      done(null, result);
  });
};

// createAndSavePerson((req, res) => {
//   console.log("finished");
// });

//task 3 create and save many people
var arrayOfPeople = [
  {name: "Frankie", age: 74, favouriteFoods: ["del taco"]},
  {name: "Sol", age: 76, favouriteFoods: ["roast chiken"]},
  {name: "Robert", age: 78, favouriteFoods: ["wine"]},
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people)=>{
      if (err) return console.log(err);
      done(null, people);
  });
};

//for testing
// createManyPeople(arrayOfPeople, (req, res)=>{
//   console.log("finished with " + res);
// })

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err, personFound)=>{
    if(err) return console.log(err);
    done(null, personFound);
  });
};

findPeopleByName("Frankie", (req, personFound)=>{
    console.log("Found person " + personFound)
});

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
