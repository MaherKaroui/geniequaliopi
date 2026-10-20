import {describe,expect,it} from 'vitest';
import {normalizeStrictSchema} from '../../supabase/functions/generate-formation-preset/strict-schema';
describe('Strict formation output schema',()=>{
 it('encodes positive numeric grading bounds as numbers',()=>{const s:any={type:'number',minimum:0,exclusiveMinimum:true};normalizeStrictSchema(s);expect(s).toEqual({type:'number',exclusiveMinimum:0});});
 it('closes every nested object and requires every property',()=>{const s:any={type:'object',properties:{questions:{type:'array',items:{type:'object',properties:{question:{type:'string'},points:{type:'number',minimum:0,exclusiveMinimum:true}}}}}};normalizeStrictSchema(s);expect(s.additionalProperties).toBe(false);expect(s.required).toEqual(['questions']);expect(s.properties.questions.items.additionalProperties).toBe(false);expect(s.properties.questions.items.required).toEqual(['question','points']);expect(s.properties.questions.items.properties.points.exclusiveMinimum).toBe(0);});
});
