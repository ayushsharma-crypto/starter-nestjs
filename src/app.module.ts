import { Module } from '@nestjs/common';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GithubController } from "./github/github.controller";
import { GithubService } from "./github/github.service";
import { GithubModule } from "./github/github.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [GithubModule, ConfigModule.forRoot()],
    controllers: [AppController, GithubController],
    providers: [AppService, GithubService],
})
export class AppModule {}
