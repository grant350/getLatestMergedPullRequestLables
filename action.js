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

    try {
      const closedPullRequests = await octokit.rest.pulls.list({
        owner,
        repo,
        sort: 'updated',
        direction: 'desc',
        state: 'all',
        per_page: 100
      });
      const PR = closedPullRequests.data.find((pr) => pr.merge_commit_sha === SHA);

        if (PR.labels) {
          core.setOutput("labels", PR.labels.map((currentValue) => currentValue.name));
          return;
        }
      throw new Error("No PR's or labels found");
    } catch (e) {
      core.error(e);
      core.setfailed(e.message);
      console.log(e);
    }

}
main(); // run fn