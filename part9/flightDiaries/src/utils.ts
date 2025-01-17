import { Weather,Visibility } from './types';
import * as z from 'zod';


export const NewEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().date(),
  comment: z.string().optional()
});
