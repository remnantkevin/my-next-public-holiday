import { StateCodeSchema, StateNameSchema } from "./schemas.js";
import { StateCode, StateName } from "./types.js";

// https://data.gov.au/dataset/ds-dga-b1bc6077-dadd-4f61-9f8c-002ab2cdff10/details
export const holidayApiResourceIds = {
  // https://data.gov.au/dataset/ds-dga-b1bc6077-dadd-4f61-9f8c-002ab2cdff10/distribution/dist-dga-2dee10ef-2d0c-44a0-a66b-eb8ce59d9110/details
  2021: "2dee10ef-2d0c-44a0-a66b-eb8ce59d9110",
  // https://data.gov.au/dataset/ds-dga-b1bc6077-dadd-4f61-9f8c-002ab2cdff10/distribution/dist-dga-d256f989-8f49-46eb-9770-1c6ee9bd2661/details
  2022: "d256f989-8f49-46eb-9770-1c6ee9bd2661",
};

export const stateCodeToName = new Map<StateCode, StateName>([
  [
    StateCodeSchema.enum.act,
    StateNameSchema.enum["Australian Capital Territory"],
  ],
  [StateCodeSchema.enum.nsw, StateNameSchema.enum["New South Wales"]],
  [StateCodeSchema.enum.nt, StateNameSchema.enum["Northern Territory"]],
  [StateCodeSchema.enum.qld, StateNameSchema.enum.Queensland],
  [StateCodeSchema.enum.sa, StateNameSchema.enum["South Australia"]],
  [StateCodeSchema.enum.tas, StateNameSchema.enum.Tasmania],
  [StateCodeSchema.enum.vic, StateNameSchema.enum.Victoria],
  [StateCodeSchema.enum.wa, StateNameSchema.enum["Western Australia"]],
]);
