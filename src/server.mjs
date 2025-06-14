import { app } from './app.mjs';
import blockchainRoutes from './routes/blockchain-routes.mjs';
import networkServer from './network.mjs';
import Blockchain from './models/blockchain/Blockchain.mjs';
import fs from 'fs/promises';
import path from 'path';
import errorHandler from './middleware/errorHandler.mjs';
import { db } from './db/database.mjs';
import usersRouter from './routes/users-routes.mjs';


export const blockChain = new Blockchain();
export const server = new networkServer({ blockchain: blockChain });

const DEFAULT_PORT = 3000;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;
let NODE_PORT;¨

app.use('/api/v1/users', usersRouter);

app.use(errorHandler);
app.get('/api/v1/blocks', async(req,res) => {
  const result = await db.all('SELECT * FROM blocks');
})

app.post('api/v1/blocks', (req, res) => {

})
req.body.id = crypto.randomUUID().replaceAll('-','');

app.use('/api/blocks/', blockchainRoutes);

const synchronize = async () => {
  const response = await fetch(`${ROOT_NODE}/api/blocks`);
  if (response) {
    const result = await response.json();
    console.log('Replacing chain on sync with:', result.data.chain);
    blockChain.replaceChain(result.data.chain);
  }
};

if (process.env.GENERATE_NODE_PORT === 'true') {
  NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = NODE_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(
    `Servern är startad på adress ${PORT} och kör i läget ${process.env.NODE_ENV}`
  );

  if (PORT !== DEFAULT_PORT) {
    synchronize();
  }
});