import githubService from '../services/github.service.js';

export const initiateGithubAuth = (_req, res) => {
  try {
    const authUrl = githubService.getAuthUrl();
    return res.redirect(authUrl);
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const handleGithubCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const accessToken = await githubService.getAccessToken(code);
    const user = await githubService.verifyUser(accessToken);

    return res.status(200).json({
      status: 'success',
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const createGithubIssue = async (req, res) => {
  try {
    const { owner, repo, title, body, accessToken } = req.body;

    const issue = await githubService.createIssue(accessToken, owner, repo, title, body);

    return res.status(201).json({
      status: 'success',
      data: issue,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};
