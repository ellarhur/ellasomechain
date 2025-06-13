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
  }
});

const blockSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true
  },
  previousHash: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  transactions: [transactionSchema],
  nonce: {
    type: Number,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  },
  miner: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Indexera för snabbare sökningar
blockSchema.index({ hash: 1 });
blockSchema.index({ previousHash: 1 });
blockSchema.index({ timestamp: -1 });

const Block = mongoose.model('Block', blockSchema);

export default Block; 