const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
  try {
    const payload = github.context.payload;
    const owner = payload.repository.owner.name;
    const repo = payload.repository.name;
    const token = core.getInput('token', {
      required: true
    });
    const octokit = new github.getOctokit(token);
    const SHA = github.context.sha;
    var pullRequests = await octokit.rest.pulls.list({
      owner,
      repo,
      per_page: 10
    });
    pullRequests = pullRequests.data
    console.log('SHA', SHA);
    const PR = pullRequests.find(p => p.merge_commit_sha === SHA);
    console.log('PR: ', PR);
    core.setOutput("labels", PR.labels);
    if (PR === undefined || PR === null) {
      throw new Error("There is no labels or there is no merge commit found. Is this a Pull-Request event?");
    }
  } catch (error) {
    core.setFailed(error.message);
  }

}
main(); // run fn