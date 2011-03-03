var Student;

function defineModels(mongoose, fn) {
  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;


// Model: Student
Student = new Schema({
  'firstName': { type: String, index: true },
  'lastName': String,
  'grade': Number,
  'user_id': ObjectId
});

mongoose.model('Student', Student);

fn();
}

exports.defineModels = defineModels; 

