import { describe, expect, it } from "vitest";
import { z } from "zod";
const taskInput=z.object({id:z.string().uuid(),title:z.string().trim().min(1).max(240),priority:z.enum(["low","medium","high"]).default("medium"),completed:z.boolean().default(false)});
describe("task input validation",()=>{
 it("accepts a valid task",()=>{expect(taskInput.safeParse({id:"550e8400-e29b-41d4-a716-446655440000",title:"Plan the week",priority:"high"}).success).toBe(true)});
 it("rejects blank titles",()=>{expect(taskInput.safeParse({id:"550e8400-e29b-41d4-a716-446655440000",title:"  "}).success).toBe(false)});
 it("rejects unsupported priorities",()=>{expect(taskInput.safeParse({id:"550e8400-e29b-41d4-a716-446655440000",title:"Task",priority:"urgent"}).success).toBe(false)});
});
