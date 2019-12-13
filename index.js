const core = require('@actions/core');
const github = require('@actions/github');

try {
  const baseURL = core.getInput('base-url');
  const issuePrefix = core.getInput('issue-prefix');
  console.log(`Received base-url: ${baseURL} and issue-prefix: ${issuePrefix}`);
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
