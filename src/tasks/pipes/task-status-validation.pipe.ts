import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatusEnum } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        TaskStatusEnum.OPEN,
        TaskStatusEnum.IN_PROGRESS,
        TaskStatusEnum.DONE
    ]
    transform(value: any) {
        value = value.toUpperCase();
        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is invalid status`)
        }
        return value;
    }
    isStatusValid(status) {
        return this.allowedStatuses.indexOf(status) !== -1;
    }
}