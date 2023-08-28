import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function company(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const dateTime = new Date();
    return { body: `Hello, Testing build for auto deployment! Datetime : ${dateTime}` };
    
};

app.http('company', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: company
});
