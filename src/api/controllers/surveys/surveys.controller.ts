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
import { User } from 'src/api/decorators/users/getUser';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AdminAuthGuard } from 'src/api/guards/admin/adminAuthGuard';
import { Admins } from 'src/db/models/admins/admins';

 
@UseGuards(AdminAuthGuard)
@ApiTags('Admins')
@Controller('surveys')
export class SurveysController {
    constructor(
      private readonly surveysService: SurveysService,
      private readonly jwtService: JwtService,
    ) {}
  
    @ApiResponse({ status: 200, type: CreateSurveysResponseDto })
    @Post()
    async register(@Body() dto: CreateSurveysDto, @User() user: Admins): Promise<CreateSurveysResponseDto> {
        return await this.surveysService.create(user.id, dto);
    }
  
    @ApiResponse({ status: 200, type: UpdateSurveysResponseDto })
    @Patch(':survey_id')
    async changeTitle(
      @Body() dto: UpdateSurveysDto,
      @User() user: Admins,
      @Param('survey_id', ParseIntPipe) survey_id: number,
    ): Promise<UpdateSurveysResponseDto> {
        return await this.surveysService.changeTitle(survey_id, user.id, dto);
    }
  
    @ApiResponse({ status: 200, type: [GetByOwnerIdSurveysResponseDto] })
    @Get()
    async getListByOwnerId(
      @User() user: Admins,
    ): Promise<GetByOwnerIdSurveysResponseDto[]> {
        return await this.surveysService.getByOwnerId(user.id);
    }
  
    @ApiResponse({ status: 200, type: DeleteSurveysResponseDto })
    @Delete(':survey_id')
    async delete(
      @Param('survey_id', ParseIntPipe) survey_id: number,
    ): Promise<DeleteSurveysResponseDto> {
      return await this.surveysService.delete(survey_id);
    }

  
}
  