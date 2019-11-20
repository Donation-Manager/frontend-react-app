import { Manager } from "./Manager";
import { DonationItem } from "./DonationItem";

export interface DonationNeed {
  _id: string;
  dateCreationDate: Date;
  donationItem: Partial<DonationItem>;
  itemQuantity: number;
  manager: Manager;
}
