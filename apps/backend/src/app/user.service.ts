import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  

  private  userData = {
    data: {
      user: {
        id: 1,
        firstName: "Zaria",
        fatherName: "Edward",
        grandfatherName: "Ernest",
        familyName: "Willie",
        localizedName: {
          firstName: "صفوان",
          fatherName: "حمدان",
          grandfatherName: "هشام",
          familyName: "عباس"
        },
        nationalId: {
          idNumber: "1c1f3fde-0581-4afb-8c7e-abacf3bc5875",
          expiryDate: new Date("2024-07-24T22:45:29.864Z")
        },
        nationalities: [
          {
            country: {
              id: "1016",
              name: "Bolivia"
            },
            countryId: 1016
          },
          {
            country: {
              id: "1117",
              name: "Latvia"
            },
            countryId: 1117
          },
          {
            country: {
              id: "1225",
              name: "Virgin Islands, U.S."
            },
            countryId: 1225
          }
        ],
        maritalStatus: {
          id: "27",
          name: "Divorced"
        },
        dependants: 60
      }
    }
  };


  public findUserById(userId: number) {
    if (this.userData.data.user.id === userId) {
      return this.userData.data.user;
    }
    return null;
  }

  public updateUser(userId: number, updatedData: UpdateUserInput) {
    const user = this.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    this.userData.data.user = {
      ...user,
      ...updatedData,
      localizedName: {
        ...user.localizedName,
        ...updatedData.localizedName
      },
      nationalId: {
        ...user.nationalId,
        ...updatedData.nationalId
      },
      maritalStatus: {
        ...user.maritalStatus,
        ...updatedData.maritalStatus
      }
    };

   
    return this.userData.data.user;
  }
}
