import { Configuration } from "openai";

export const configureApi=async()=>{
    const config=new Configuration({
        apiKey:process.env.OPEN_AI_SECRET,
        organization:process.env.OPENAI_ORGANIZATION_iD
    })
    return config
}