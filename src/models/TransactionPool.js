import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  sender: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['transfer', 'reward'],
    default: 'transfer'
  },
  gasFee: {
    type: Number,
    default: 0
  },
  message: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'pending'
  }
});

const transactionPoolSchema = new mongoose.Schema({
  transactions: [transactionSchema]
}, {
  timestamps: true
});

// Metoder för att hantera transaktioner
transactionPoolSchema.methods.addTransaction = async function(transaction) {
  this.transactions.push(transaction);
  return this.save();
};

transactionPoolSchema.methods.removeTransaction = async function(transactionId) {
  this.transactions = this.transactions.filter(tx => tx.id !== transactionId);
  return this.save();
};

transactionPoolSchema.methods.clearTransactions = async function() {
  this.transactions = [];
  return this.save();
};

const TransactionPool = mongoose.model('TransactionPool', transactionPoolSchema);

export default TransactionPool; 