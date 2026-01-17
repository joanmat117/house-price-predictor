import type { PredictionData } from "../types/PredictionSchema";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function generatePrediction(fields: PredictionData, authToken: string) {
    console.info('Entro en el generatePrediction');
    
    try {
        const res = await fetch(`${BACKEND_URL}/predict?token=${authToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields)
        });

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await res.text();
            console.error('Expected JSON but got:', text.substring(0, 200));
            throw new Error('Server did not return JSON');
        }
        const statusCode = res.status
        const data = await res.json();
        console.log('Response prediction: ', data,statusCode);

        return {data,statusCode};

    } catch (error) {
        console.error('Error in generatePrediction:', error);
        throw error;
    }
}
