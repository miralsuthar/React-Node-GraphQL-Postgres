import express from 'express';
import {graphqlHTTP} from 'express-graphql'
import {schema} from './Schema';
import cors from 'cors';
import {createConnection} from 'typeorm'
import {Users} from './Entities/Users';
const main = async () => {
    await createConnection({
        type: "postgres",
        database: "graphqlcrud",
        username: "postgres",
        password: "2000miral97240",
        logging: true,
        synchronize: false,
        entities: [Users],
    })

    const app = express();
    app.use(cors())
    app.use(express.json())
    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true
    }))

    

    app.listen(3001, () => {
        console.log("server is running on port 3001");
    })
}

main().catch((err) => {
    console.log(err)
})