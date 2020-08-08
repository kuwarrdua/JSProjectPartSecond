// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/
const mongoose = require('mongoose');

const CarInventorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  carMake: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  warranty: {
    type: String, 
    enum: ['IN WARRANTY', 'NOT IN WARRANTY'],
    required: true
  },
  model: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    getters: true
  }
});

// Query Helpers
CarInventorySchema.query.inWarranty = function () {
  return this.where({
    status: 'IN WARRANTY'
  })
};

CarInventorySchema.query.outOfWarranty = function () {
  return this.where({
    status: 'NOT IN WARRANTY'
  })
};


module.exports = mongoose.model('Cars', CarInventorySchema);
