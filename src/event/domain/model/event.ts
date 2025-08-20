import { ApiProperty } from '@nestjs/swagger';

export class EventM {
  @ApiProperty({ example: 'uuidevent' })
  id?: string;

  @ApiProperty({ example: 'Мероприятие номер 1' })
  title: string;

  @ApiProperty({ example: 'На этом мероприятие будут пить чай' })
  description: string;

  @ApiProperty({ example: '2025-09-22T00:00:00.000Z' })
  date: Date;

  @ApiProperty({ example: true })
  isPublished: boolean;

  @ApiProperty({ example: 100 })
  places: number;

  @ApiProperty({ example: 'uuiduser' })
  creatorId: string;
}
