import { Controller, Get, Res, Query } from "@nestjs/common";
import { Response } from "express";
import { GithubService } from "./github.service";

@Controller("github")
export class GithubController {
    constructor(private readonly githubService: GithubService) {}

    @Get("login")
    startGitHubLoginFlow(@Res() res: Response): void {
        const url: string = this.githubService.startGitHubLoginFlow();
        res.redirect(url);
    }

    @Get("callback")
    async handleGitHubCallback(
        @Query("code") code: string,
        @Res() res: Response,
    ): Promise<void> {
        const redirect_url: string =
            await this.githubService.handleGitHubCallback(code);
        res.redirect(redirect_url);
    }
}
