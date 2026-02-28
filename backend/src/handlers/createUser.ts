import {APIGatewayProxyEventV2} from 'aws-lambda';
import {createUser} from '../services/user.service';
import {createUserSchema} from '../schemas/user.schema';

export const handler=async(event: APIGatewayProxyEventV2)=>{
    try{
        const body = JSON.parse(event.body || '{}');
        const parse = createUserSchema.parse(body);
        const user= await createUser(parse);
        return {
            statusCode: 201,
            body: JSON.stringify(user)
        }
    
    }catch(error){
        return {
            statusCode: 400,
            body: JSON.stringify({message: (error as Error).message})
        }

    }
}