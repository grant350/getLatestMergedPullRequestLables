const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    const payload = github.context.payload;
    const owner = payload.repository.owner.name;
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
        state: 'closed',
        per_page: 100
      });
      const PR = closedPullRequests.data.find((pr) => pr.merge_commit_sha === SHA);
      if (PR) {
        if (PR.labels) {
          core.setOutput("labels", PR.labels.map((currentValue) => currentValue.name));
        }
      }
    } catch {
      console.log("No closed PR's")
    }

    const openPullRequests = await octokit.rest.pulls.list({
      owner,
      repo,
      state: 'all'
    });

    console.log('opened prs: ',openPullRequests);

    try {
      const openPullRequests = await octokit.rest.pulls.list({
        owner,
        repo,
        state: 'all'
      });

      console.log('opened prs: ',openPullRequests);
      const PR = openPullRequests.data.find((pr) => pr.head.sha === SHA);
      if (PR) {
        if (PR.labels) {
          core.setOutput("labels", PR.labels.map((currentValue) => currentValue.name));
        }
      }
    } catch {
      console.log("No open PR's")
    }

}
main(); // run fn