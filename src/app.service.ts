import { join } from "path";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    getHtmlPath(): string {
        return join(process.cwd(), "public", "index.html");
    }
}
