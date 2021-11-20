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
  //{name: "Robert", age: 78, favouriteFoods: ["wine"]},
  {name: "Garry", age: 78, favouriteFoods: ["wine", "burito", "grapes"]},
  {name: "Susan", age: 40, favouriteFoods: ["wine", "burito"]},
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

// findPeopleByName("Frankie", (req, personFound)=>{
//     console.log("Found person " + personFound)
// });

const findOneByFood = (food, done) => {
  Person.findOne({favouriteFoods: food}, (err, personFound)=>{
      if(err) return console.log(err);
      done(null, personFound);
  });
};

// findOneByFood("eggs", (req, personFound)=>{
//   console.log("Person found is " + personFound);
// });



const findPersonById = (personId, done) => {
  Person.findOne({_id: personId}, (err, personFound)=>{
    if(err) return console.log(err);
    done(null, personFound);
});
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (err, person) =>{
    if(err) return console.log(err);
    person.favouriteFoods.push(foodToAdd);
    person.save((err, updatedPerson)=>{
      if(err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

// findEditThenSave("6198279adbb6b74c941f975f", (err, done) => {
//   console.log("done");
// });

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err, personFound) => {
    if(err) return console.log(err);
    done(null, personFound);
    
  });
};

// findAndUpdate("Frankie", (err, personFound) => {
//   if(err) {console.log(err);}
//   console.log("updated Frankie to: " + personFound)
// });

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, personDeleted)=>{
    if(err) return console.log(err);
    done(null, personDeleted);
  })
};

// removeById("6198279adbb6b74c941f975f",(err, personRemoved)=>{
//   if(err){console.log(err);}
//   console.log("person removeed was: " + personRemoved);
// });

const removeManyPeople = (done) => {
  const nameToRemove = ["Jane Fonda", "Sol","bag head"];
  
  Person.deleteMany({name:nameToRemove}, (err, result)=>{
    if(err) return console.log(err);
    done(null, result);
  });
};

// removeManyPeople((err, result)=>{
//   if(err){console.log(err);}
//   console.log("result is: " + result)
// })

const queryChain = (done) => {
  const foodToSearch = "burito";
  Person.find({favouriteFoods:foodToSearch})
  .sort({age: 1})
  .limit(2)
  .select({age:0})
  .exec((err,data)=>{
    done(err,data);
  });
};

queryChain((err, data)=>{
  if(err) {console.log(err);}
  console.log("result of query chain is: " + data);
});
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
