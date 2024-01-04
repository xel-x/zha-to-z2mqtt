import {z} from "zod";

export const DeviceData = z.object({
    ieee: z.string(),
    nwk: z.number(),
    nwk_hex: z.string().optional(),
    user_given_name: z.string(),
    manufacturer: z.string(),
    model: z.string(),
    name: z.string(),
    device_type: z.string(),
    last_seen: z.string(),
    area_id: z.string().nullable(),
    entities: z.array(z.object({
        entity_id: z.string(),
        name: z.string(),
    }))
});

export type DeviceData = z.infer<typeof DeviceData>;

export const DevicesData = z.object({
    devices: z.array(DeviceData)
})

export type DevicesData = z.infer<typeof DevicesData>;
