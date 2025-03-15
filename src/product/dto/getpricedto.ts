import { IsNotEmpty } from "class-validator";

export class GetPricepFilter {
    @IsNotEmpty()
    idrs: string;
}