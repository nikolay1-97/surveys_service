import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Req,
    Param,
    ParseIntPipe,
    UseGuards,
  } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SurveysService } from 'src/service/surveys/surveys.service';
import { CreateSurveysDto } from 'src/api/dto/surveys/surveysCreate.dto';
import { CreateSurveysResponseDto } from 'src/api/dtoResponse/surveys/surveysCreateResponse.dto';
import { UpdateSurveysDto } from 'src/api/dto/surveys/surveysUpdate.dto';
import { UpdateSurveysResponseDto } from 'src/api/dtoResponse/surveys/surveysUpdateResponse.dto';
import { GetByOwnerIdSurveysResponseDto } from 'src/api/dtoResponse/surveys/surveysGetByOwnerIdResp.dto';
import { DeleteSurveysResponseDto } from 'src/api/dtoResponse/surveys/surveysDeleteResponse.dto';
import { Payload } from 'src/api/decorators/users/getPayload';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AdminAuthGuard } from 'src/api/guards/admin/adminAuthGuard';

  
  //@UseGuards(AdminAuthGuard)
  @ApiTags('Admins')
  @Controller('surveys')
  export class SurveysController {
    constructor(
      private readonly surveysService: SurveysService,
      private readonly jwtService: JwtService,
    ) {}
  
    @ApiResponse({ status: 200, type: CreateSurveysResponseDto })
    @Post()
    async register(@Body() dto: CreateSurveysDto, @Payload() payload): Promise<CreateSurveysResponseDto | undefined> {
        return await this.surveysService.create(payload.sub, dto);
    }
  
    @ApiResponse({ status: 200, type: UpdateSurveysResponseDto })
    @Patch(':survey_id')
    async changeTitle(
      @Body() dto: UpdateSurveysDto,
      @Req() request: Request,
      @Param('survey_id', ParseIntPipe) survey_id: number,
    ): Promise<UpdateSurveysResponseDto | undefined> {
      const token = request.headers.authorization;
      if (token) {
        const payload = this.jwtService.decode(token.substring(7, token.length));
        const admin_id = payload.sub;
        if (admin_id) {
          return await this.surveysService.update(survey_id, admin_id, dto);
        }
      }
    }
  
    @ApiResponse({ status: 200, type: [GetByOwnerIdSurveysResponseDto] })
    @Get()
    async getListByOwnerId(
      @Req() request: Request,
    ): Promise<GetByOwnerIdSurveysResponseDto[] | undefined> {
      const token = request.headers.authorization;
      if (token) {
        const payload = this.jwtService.decode(token.substring(7, token.length));
        const admin_id = payload.sub;
        if (admin_id) {
          return await this.surveysService.getByOwnerId(admin_id);
        }
      }
    }
  
    @ApiResponse({ status: 200, type: DeleteSurveysResponseDto })
    @Delete(':survey_id')
    async delete(
      @Param('survey_id', ParseIntPipe) survey_id: number,
    ): Promise<DeleteSurveysResponseDto> {
      return await this.surveysService.delete(survey_id);
    }

  
}
  