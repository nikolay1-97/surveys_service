import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AdminsAuthService } from 'src/service/admins/adminsAuth.service';
import { LoginAdminsDto } from 'src/api/dto/admins/adminsLogin.dto';
import { LoginAdminsResponseDto } from 'src/api/dtoResponse/admins/adminsLoginResponse.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsAuthService: AdminsAuthService) {}

  @ApiResponse({ status: 200, type: LoginAdminsResponseDto })
  @Post()
  async login(
    @Body() dto: LoginAdminsDto,
  ): Promise<LoginAdminsResponseDto> {
    const token = await this.adminsAuthService.login(
      dto.email,
      dto.password,
    );
    if (token) {
      return new LoginAdminsResponseDto({
        access_token: token.access_token,
      });
    }
    throw new BadRequestException('неверный логин или пароль');
  }
}
