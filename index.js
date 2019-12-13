const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const baseURL = core.getInput('base-url');
    const issuePrefix = core.getInput('issue-prefix');
    const githubAuth = core.getInput('github-auth');

    const octokit = new github.GitHub(githubAuth);

    console.log(github.context);
    const repo = github.context.repo.repo;
    const owner = github.context.repo.owner;
    const branch = github.context.payload.pull_request.head.ref;
    console.log(`repo: ${repo} owner: ${owner}`);
    console.log(github.context.payload.number);
    console.log(branch);

    const regexString = `${issuePrefix}-\\d+`;
    let issueRegex = new RegExp(regexString);
    let issue = branch.match(issueRegex);
    
    await octokit.issues.createComment({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number: github.context.payload.number,
        body: `[JIRA](${baseURL}/browse/${issue}) :+1:`
    });
}

try {
    run();
} catch (error) {
    core.setFailed(error.message);
}
