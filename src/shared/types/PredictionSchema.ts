import type { Mask } from "node_modules/zod/v4/core/util.d.cts";
import {z} from 'zod'
import { createPredictionSchema } from "../schemas/PredictionSchema";

export type PredictionSchemaType = ReturnType<typeof createPredictionSchema>


export type PredictionData = z.infer<PredictionSchemaType>
export type SchemaKeys = keyof PredictionData

export type PredictionSchemaMask = Mask<SchemaKeys>
