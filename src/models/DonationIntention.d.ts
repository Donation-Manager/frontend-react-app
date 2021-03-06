import { Giver } from "./Giver";
import { DonationNeed } from "./DonationNeed";

export interface DonationIntention {
  _id: int;
  collectFromGiver: boolean;
  collectDate: Date;
  collectHour: Date;
  description: string;
  giver: Giver;
  donationNeed: DonationNeed;
  quantity: number;
  approved: boolean;
  street: string;
  houseNumber: int;
  city: string;
  received: boolean;
}
