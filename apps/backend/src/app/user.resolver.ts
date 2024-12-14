import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  user(@Args('id', { type: () => Number }) id: number) {
    return this.userService.findUserById(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('userId') userId: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ) {
    return this.userService.updateUser(userId, updateUserInput);
  }
}
