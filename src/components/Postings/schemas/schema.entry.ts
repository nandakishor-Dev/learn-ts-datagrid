import { z } from "zod";

export const entrySchema = z.object({
  entryType: z.string().min(1, "Required"),
  glAccount: z.string().min(1, "Required").max(32),
  txnSequence: z
    .number({ message: "Transaction Sequence must be a number" })
    .int("Must be an integer")
    .nonnegative("Cannot be negative"),
  subLedgerAccount: z.string().min(1, "Required"),
  narrative: z.string().max(500).optional(),
  division: z.string().min(1, "Required"),
  txnAmount: z
    .number({ message: "Transaction Amount must be a number" })
    .gt(0, "Must be greater than 0"),
  currency: z.string().min(1, "Required"),

  foreignAmount: z
    .number({ message: "Foreign Amount must be a number" })
    .gt(0, "Must be greater than 0"),
});

// export type EntryFormOutput = z.output<typeof entrySchema>;
