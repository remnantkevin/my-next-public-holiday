import "v-calendar";

declare module "v-calendar" {
  export interface CalendarElement {
    move: (date: Date | undefined) => Promise<boolean>;
    focusDate: (date: Date | undefined) => Promise<boolean>;
  }
}
