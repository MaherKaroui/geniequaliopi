/** Normalize draft-07/Zod numeric bounds and enforce the gateway's strict object schema. */
export function normalizeStrictSchema(value: unknown): void {
 if(!value||typeof value!=='object')return;
 const schema=value as Record<string,unknown>;
 if(schema.exclusiveMinimum===true){schema.exclusiveMinimum=schema.minimum;delete schema.minimum;}
 if(schema.exclusiveMaximum===true){schema.exclusiveMaximum=schema.maximum;delete schema.maximum;}
 if(schema.type==='object'&&schema.properties&&typeof schema.properties==='object'){
  schema.additionalProperties=false;schema.required=Object.keys(schema.properties);
 }
 for(const child of Object.values(schema))normalizeStrictSchema(child);
}
