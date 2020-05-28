import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Pipe({
  name: 'usersFilter'
})
export class UsersFilterPipe implements PipeTransform {

  transform(users: User[], value: string): User[] {
    if (!value) {
      return users;
    } else {
      value = value.toLowerCase();
      return users.filter(s => s.userName.toLowerCase().includes(value))
    }
  }

}
