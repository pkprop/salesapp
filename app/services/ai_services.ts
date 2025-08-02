import { GoogleGenAI } from "@google/genai";
import env from "#start/env";
const PROJECT_ID=785086642425
const ai = new GoogleGenAI({ apiKey: env.get('GEMINI_API_KEY') });

export default class AIService{

    static async productMeta(product?:any){
        try {
             const prompt = `
                You are a helpful SEO assistant. Generate SEO meta tags for a product.
                Product Name: "${product?.name}"
                Category: "${product?.category?.name}"
                Brand: "NXB"
                Main Features: "${product?.key_features}"
                Return a valid JSON object in the following schema:
                {
                "title": "string",
                "description": "string",
                "keywords": ["string", "string", "..."]
                }
                Only return valid JSON. Do not include markdown, comments, or extra text.
                `;
            if(product){
                const response = await ai.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents: prompt,
                    config:{
                        responseMimeType: "application/json",
                    }
                });
                return {status:'success',data:response.text}
            }
            throw new Error('Please add a product title')
        } catch (error) {
           throw new Error(error)
        } 
    }

    static async pageMeta(text?:string){
        try {
            const prompt = `
                You are a helpful SEO assistant. Generate SEO meta tags for a ${text} page.
                Brand: "NXB"
                Return a valid JSON object in the following schema:
                {
                "title": "string",
                "description": "string",
                "keywords": ["string", "string", "..."]
                }
                Only return valid JSON. Do not include markdown, comments, or extra text.
                `;
            if(text){
                const response = await ai.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents:prompt,
                    config:{
                        responseMimeType: "application/json",
                    }
                });
                return {status:'success',data:response.text}
            }
            throw new Error('Please add a page title')
        } catch (error) {
           throw new Error(error)
        } 
    }

    static async blogMeta(text?:string){
        try {
            const prompt = `
                You are a helpful SEO assistant. Generate SEO meta tags for a ${text} blog.
                Brand: "NXB"
                Return a valid JSON object in the following schema:
                {
                "title": "string",
                "description": "string",
                "keywords": ["string", "string", "..."]
                }
                Only return valid JSON. Do not include markdown, comments, or extra text.
                `;
            if(text){
                const response = await ai.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents:prompt,
                    config:{
                        responseMimeType: "application/json",
                    }
                });
                return {status:'success',data:response.text}
            }
            throw new Error('Please add a title')
        } catch (error) {
           throw new Error(error)
        } 
    }
}