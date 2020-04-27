import { Address } from './address.model';
import { Coach } from './coach.model';
import { User } from './user.model';

export class FamilyMember{
   firstName:string;
   lastName:string;
   middleInitial?:string ;
   phoneNumber?:string;
   email?:string
   user?:User;
   address?: Address;
   relation:string;
   dateOfBirth:string;
   //constructor(_user: User,address:Address,coach:Coach) { };
}

