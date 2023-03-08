import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { oauthAuthorizationUrl } from "@octokit/oauth-authorization-url";
import { createOAuthUserAuth } from "@octokit/auth-oauth-user";
import { Octokit } from "octokit";
import * as github_settings from "../../github_settings.json";

@Injectable()
export class GithubService {
    startGitHubLoginFlow(): string {
        const github_scopes: Array<string> =
            process.env.GITHUB_SCOPES.split(",");
        const { url } = oauthAuthorizationUrl({
            clientType: "oauth-app",
            clientId: process.env.GITHUB_CLIENT_ID,
            scopes: github_scopes,
        });
        return url;
    }

    async handleGitHubCallback(code: string): Promise<string> {
        const auth = createOAuthUserAuth({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            code,
        });
        const { token } = await auth();
        const octokit = new Octokit({ auth: token });
        const res = await octokit.rest.repos.createUsingTemplate({
            template_owner: github_settings.template_owner,
            template_repo: github_settings.template_repo,
            name: github_settings.new_repo_name,
        });
        if (res.status !== 201) {
            throw new HttpException(
                "Some error occured while creating the repo",
                HttpStatus.FAILED_DEPENDENCY,
            );
        }
        return res.data.html_url;
    }
}
