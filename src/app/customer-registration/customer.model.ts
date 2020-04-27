import { Address } from './address.model';
import { Coach } from './coach.model';
import { User } from './user.model';
import { FamilyMember } from './family.member.model ';

export class Customer{
   firstName:string;
   lastName:string;
   middleInitial:string ;
   phoneNumber:string;
   password:String;
   email:string
   role:String[];
   user:User;
   address: Address;
   coach:Coach;
   //constructor(_user: User,address:Address,coach:Coach) { };
   familyMember:FamilyMember;
}

