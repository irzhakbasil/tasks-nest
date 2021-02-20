import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatusEnum } from "../task.model";

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TaskStatusEnum.OPEN, TaskStatusEnum.IN_PROGRESS, TaskStatusEnum.DONE])
    status: TaskStatusEnum;

    @IsOptional()
    @IsNotEmpty()
    searchTerm: string;
}