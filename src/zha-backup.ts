import {z} from "zod";

const hexValueSequenceRE = /^([0-9a-f]{2}:)+([0-9a-f]{2})$/;
export const ZHABackup = z.object({
    network_info: z.object({
        extended_pan_id: z.string().regex(hexValueSequenceRE),
        pan_id: z.string(),
        channel: z.number(),
        network_key: z.object({
            key: z.string().regex(hexValueSequenceRE)
        })
    })
});

export type ZHABackup = z.infer<typeof ZHABackup>;