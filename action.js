const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
  try {
    const payload = github.context.payload;
    const owner = payload.repository.owner.name;
    const repo = payload.repository.name;
    const token = core.getInput('token', {required: true});
    const octokit = new github.getOctokit(token);
    const SHA = github.context.sha;
    const pullRequests = await octokit.rest.pulls.list({
      owner,
      repo,
      sort: 'updated',
      direction: 'desc',
      state: 'closed',
      per_page: 100
    });

    const PR = pullRequests.data.find((pr) => {return pr.merge_commit_sha === SHA});
    if (PR){
      if (PR.labels){
        core.setOutput("labels", PR.labels.map((currentValue)=> currentValue.name));
      }
    }
    return;
  } catch (error) {
    core.setFailed(error.message);
  }

}
main(); // run fn