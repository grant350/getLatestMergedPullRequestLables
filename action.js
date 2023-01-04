const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    const payload = github.context.payload;
    const owner = payload.repository.owner.login;
    const repo = payload.repository.name;
    const token = core.getInput('token', {
      required: true
    });
    const octokit = new github.getOctokit(token);
    const SHA = github.context.sha;
    const closedPullRequests = await octokit.rest.pulls.list({
        owner,
        repo,
        sort: 'updated',
        direction: 'desc',
        state: 'all',
        per_page: 100
      });
      const PR = closedPullRequests.data.find((pr) => pr.merge_commit_sha === SHA || pr.head.sha === SHA );
     console.log('sha',SHA,'pr', PR);
      if (PR.labels) {
        core.setOutput("labelNames", PR.labels.map((currentValue) => currentValue.name));
        return;
    }
    core.setFailed("No PR's or labels found")
}
main(); // run fn